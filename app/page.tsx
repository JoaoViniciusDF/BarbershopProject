import { EyeIcon, FootprintsIcon, SearchIcon } from "lucide-react";
import Header from "./_components/header"
import { db } from "./_lib/prisma"
import {Button} from "./_components/ui/button"
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import BarbershopItem from "./_components/barbershop-item";

const Home = async () => {

  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return ( 
    <div>
      {/* header */}
      <Header/>
        <div className="p-5">
          <h2 className="text-xl font-bold">Olá, João!</h2>
          <p>Sexta-feita, 9 de agosto.</p>

          <div className="mt-6 flex items-center gap-2">
            <Input placeholder="Faça sua busca..."/>
            <Button>
              <SearchIcon />
            </Button>
          </div>

          <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            <Button className="gap-2" variant="secondary">
              <Image src="/cabelo.png" width={16} height={16} alt="Cabelo" />
              Cabelo
            </Button>

            <Button className="gap-2" variant="secondary">
              <Image src="/barba.png" width={16} height={16} alt="Barba" />
              Barba
            </Button>

            <Button className="gap-2" variant="secondary">
              <Image src="/acabamento.png" width={16} height={16} alt="Acabamento" />
              Acabamento
            </Button>

            <Button className="gap-2" variant="secondary">
              <FootprintsIcon size={16} />
              Pézinho
            </Button>

            <Button className="gap-2" variant="secondary">
              <EyeIcon size={16} />
              Sobrancelha
            </Button>
          </div>

          <div className="relative mt-6 h-[150px] w-full">
            <Image alt="Agende nos melhores com FSW Barber" 
            src="/banner-01.png" 
            fill
            className="rounded-xl object-cover"/>
          </div>

          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>
          <Card>
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge className="w-fit">Confirmado</Badge>
                <h3 className="font-semibold">Corte de Cabelo</h3>

                <div className="flex item-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="logo.png"/>
                  </Avatar>
                  <p className="text-sm">Barbearia FSW</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sm">Agosto</p>
                <p className="text-2xl">05</p>
                <p className="text-sm">20:00</p>
              </div>
            </CardContent>
          </Card>

          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map(barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
          ))}
          </div>

          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map(barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
          ))}
          </div>
        </div>

        <footer>
          <Card>
            <CardContent className="px-5 py-6">
              <p className="text-sm text-gray-400">
              © 2023 Copyright <span className="font-bold">FSW Barber</span>
              </p>
            </CardContent>
          </Card>
        </footer>
      </div>
   );
}
 
export default Home;