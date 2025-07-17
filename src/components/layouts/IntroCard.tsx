"use client"
import { useSession, signOut } from "@/lib/auth-client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowRight, DoorOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WelcomeCard({ toNextPage }: { toNextPage: () => void }) {
    const { data } = useSession()
    return (
            <Card className="max-w-4xl w-full px-8 py-10 rounded-xl shadow-xl bg-white border border-gray-200 lg:mx-24">
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex-1">
                        <CardTitle className="text-3xl font-semibold text-gray-800">
                            Senang melihat kamu di sini, {data?.user.name}.
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="text-base text-gray-700 space-y-6 leading-relaxed">
                    <p>Siotics dengan senang hati menyambut kamu untuk bergabung dalam komunitas yang penuh semangat. Didirikan pada tahun 2021 di SMK Negeri 1 Jakarta, kami telah berkembang menjadi pusat kreativitas bagi para siswa dan siswi yang tertarik dengan sistem IoT dan robotika.</p>
                    <p>Pendaftaran telah dibuka, dan kami tidak sabar untuk melihat ide-ide yang akan kamu wujudkan bersama kami. klik {'"'}Mulai Pendaftaran{'"'} untuk memulai perjalanan kamu bersama Siotics, tempat di mana siapa pun bisa menciptakan hal-hal keren!</p>
                    <Button
                        size="lg"
                        onClick={toNextPage}>
                        Mulai Pendaftaran <ArrowRight className="ml-2" />
                    </Button> <br />
                    <Button size={"lg"} onClick={async () => await signOut()} className="bg-gray-600 text-white hover:bg-gray-700">
                        Logout
                        <DoorOpen></DoorOpen>
                    </Button>
                </CardContent>
            </Card>
    )
}
