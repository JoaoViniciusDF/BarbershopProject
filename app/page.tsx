import { SearchIcon } from "lucide-react";
import Header from "./_components/header"
import { db } from "./_lib/prisma"
import {Button} from "./_components/ui/button"
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOption } from "./_constants/search";
import BookingItem from "./_components/booking-item";

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
            {quickSearchOption.map(option => (
              <Button className="gap-2" variant="secondary" key={option.title}>
              <Image 
                src={option.imageUrl} 
                width={16} 
                height={16} 
                alt={option.title} 
              />
              {option.title}
            </Button>
            ))}
          </div>

          <div className="relative mt-6 h-[150px] w-full">
            <Image alt="Agende nos melhores com FSW Barber" 
            src="/banner-01.png" 
            fill
            className="rounded-xl object-cover"/>
          </div>

          <BookingItem />

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