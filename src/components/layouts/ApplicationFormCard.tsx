"use client";

import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SchoolClasses } from "@/constants/schoolClasses";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { updateUser } from "@/lib/auth-client";

import ProtectedPage from "@/components/pages/ProtectedPage";
import { RegistrationSchema } from "@/schema/registration";
import { toMajorAbbreviation } from "@/lib/schoolClasses";

type RegistrationFormValues = z.infer<typeof RegistrationSchema>;

export default function ApplicationFormCard({
  toBackPage,
}: {
  toBackPage?: () => void;
}) {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      preferedName: null,
      name: "",
      phone: "",
      major: "",
      grade: undefined,
      gradeParallel: null,
      reasonToJoin: "",
    },
  });

  const major = useWatch({
    control: form.control,
    name: "major"
  })

  const grade = useWatch({
    control: form.control,
    name: "grade"
  })

  const gradeParallel = useWatch({
    control: form.control,
    name: "gradeParallel"
  })

  const parallelChoices = SchoolClasses.find((schoolClass) => schoolClass.major === major)?.parallelChoices

  useEffect(() => {
    if (parallelChoices) {
      form.setValue("gradeParallel", 1);
    } else {
      form.setValue("gradeParallel", null);
    }

    if (major) {
        form.resetField("grade")
    }
  }, [major, form, parallelChoices]);

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true)
    await updateUser({
        ...data,
        isApplied: true
    })
    setIsSubmitting(false)
  };
  return (
    <ProtectedPage>
      <Card className="max-w-4xl w-full px-10 sm:px-32 py-10 rounded-xl shadow-xl bg-white border border-gray-200 lg:mx-24">
        <CardContent className="text-base text-gray-700 space-y-6 leading-relaxed">
          <p className="text-center text-sm text-gray-500">
            Jika terjadi masalah dalam pendaftaran silakan hubungi
            <br className="pt-2" />
            <a
              href="https://wa.me/6281238981143"
              target="_blank"
              className="hover:underline"
            >
              +62 812 3898 1143
            </a>{" "}
            (Whatsapp) - Rai
          </p>
          <hr />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Kim Minji" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preferred Name */}
              <FormField
                control={form.control}
                name="preferedName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Panggilan (Opsional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Minji" {...field} value={field.value ? field.value : ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Handphone</FormLabel>
                    <FormControl>
                      <Input placeholder="081238981143" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Major */}
              <FormField
                control={form.control}
                name="major"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jurusan</FormLabel>
                    <Select onValueChange={field.onChange}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih jurusan kamu"></SelectValue>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {SchoolClasses.map(schoolClass => (
                                <SelectItem key={schoolClass.majorAbbreviation} value={schoolClass.major}>{`${schoolClass.major} (${schoolClass.majorAbbreviation})`}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Grade */}
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tingkat Kelas</FormLabel>
                    <Select onValueChange={field.onChange}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih tingkat kelas kamu"></SelectValue>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {major ? 
                                SchoolClasses
                                    .find(schoolClass => schoolClass.major === major)?.gradeLevels!
                                    .map(grade => (
                                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                                    ))
                                 : ["X","XI","XII"].map(grade => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Parallel Class */}
              {
                parallelChoices ? (
                    <FormField
                control={form.control}
                name="gradeParallel"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Kelas Parallel</FormLabel>
                    <Select 
                         onValueChange={(val) => field.onChange(parseInt(val))}
                         value={field.value ? field.value.toString() : ""} 
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih kelas kamu"></SelectValue>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {
                             parallelChoices.map((parallelClass => (
                                 <SelectItem key={parallelClass} value={parallelClass.toString()}>
                                    {parallelClass}
                                </SelectItem>
                              )))
                            }
                        </SelectContent>
                        {(grade && gradeParallel && !Number.isNaN(gradeParallel)) && <p className="text-sm font-bold">Kelas Kamu : {grade}-{toMajorAbbreviation(major)} {gradeParallel}</p>}
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
                ) : null
            }

              <FormField
                control={form.control}
                name="reasonToJoin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alasan kamu join Siotics.</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Tulis alasanmu di sini..." {...field}></Textarea>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <Button
                  size="lg"
                  type="button"
                  onClick={toBackPage}
                  className="bg-gray-600 text-white hover:bg-gray-700"
                >
                  Kembali
                </Button>
                <Button size="lg" type="submit" className={isSubmitting ? "cursor-not-allowed opacity-50" : ""}>
                  Daftar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </ProtectedPage>
  );
}
