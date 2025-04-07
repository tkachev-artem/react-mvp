import Section from "@/components/section";
import WalletName from "@/components/name-block";
import CardName from "@/components/name-block";
import TicketName from "@/components/name-block";
import Ticket from "@/components/ticket";
import RoutesName from "@/components/name-block";
import EventsName from "@/components/name-block";
import TasksName from "@/components/name-block";
import Wallet from "@/components/wallet";
import Card from "@/components/card";
import MainConfig from "./config";

import { rublewallet, bonuswallet } from "@/hooks/walletdata";

import { RouteBlock } from "@/components/ablock";
import { EventBlock } from "@/components/ablock";
import { TaskBlock } from "@/components/ablock";

export default function Main() {
  return (
      <div className="flex flex-col justify-center gap-5">
        <Section vertical={MainConfig.section.vertical} horizontal={MainConfig.section.horizontal}> {/* Кошелек */}
          <WalletName titleName={MainConfig.walletName.titleName} buttontransferName={MainConfig.walletName.buttontransferName} buttontransferIcon={MainConfig.walletName.buttontransferIcon} link={MainConfig.walletName.link} />
          
          <Wallet namefirst={MainConfig.rublewallet.namefirst} namelast={MainConfig.rublewallet.namelast} balance={rublewallet.balance} color={MainConfig.rublewallet.color} borderColor={MainConfig.rublewallet.borderColor} icon={MainConfig.rublewallet.icon} balanceIcon={MainConfig.rublewallet.balanceIcon} />
          <Wallet namefirst={MainConfig.bonuswallet.namefirst} namelast={MainConfig.bonuswallet.namelast} balance={bonuswallet.balance} color={MainConfig.bonuswallet.color} borderColor={MainConfig.bonuswallet.borderColor} icon={MainConfig.bonuswallet.icon} balanceIcon={MainConfig.bonuswallet.balanceIcon} />
        </Section>

        <Section vertical={MainConfig.section.vertical} horizontal={MainConfig.section.horizontal}> {/* Карта горожанина */}
          <CardName titleName={MainConfig.cardName.titleName} buttontransferName={MainConfig.cardName.buttontransferName} buttontransferIcon={MainConfig.cardName.buttontransferIcon} link={MainConfig.cardName.link} />
          
          <Card />
        </Section>

        <Section vertical={MainConfig.section.vertical} horizontal={MainConfig.section.horizontal}> {/* Мои билеты */}
          <TicketName titleName={MainConfig.ticketName.titleName} buttontransferName={MainConfig.ticketName.buttontransferName} buttontransferIcon={MainConfig.ticketName.buttontransferIcon} link={MainConfig.ticketName.link} />

          <Section vertical={MainConfig.section.vertical} horizontal={MainConfig.section.horizontal}> {/* Блоки билетов */}
            <Ticket />
          </Section>
        
        </Section>

        <Section vertical={MainConfig.section.vertical} horizontal={MainConfig.section.horizontal}> {/* Маршруты */}
          <RoutesName titleName={MainConfig.routesName.titleName} buttontransferName={MainConfig.routesName.buttontransferName} buttontransferIcon={MainConfig.routesName.buttontransferIcon} link={MainConfig.routesName.link} />
          
          <Section vertical={MainConfig.sectiongrid.vertical} horizontal={MainConfig.sectiongrid.horizontal}> {/* Блоки маршрутов */}
            <RouteBlock />
          </Section>
        </Section>

        <Section vertical={MainConfig.section.vertical} horizontal={MainConfig.section.horizontal}> {/* Мероприятия */}
          <EventsName titleName={MainConfig.eventsName.titleName} buttontransferName={MainConfig.eventsName.buttontransferName} buttontransferIcon={MainConfig.eventsName.buttontransferIcon} link={MainConfig.eventsName.link} />
          
          <Section vertical={MainConfig.section.vertical} horizontal={MainConfig.section.horizontal}> {/* Блоки мероприятий */}
            <EventBlock />
          </Section>  
        </Section>  

        <Section vertical={MainConfig.section.vertical} horizontal={MainConfig.section.horizontal}> {/* Задания*/}
          <TasksName titleName={MainConfig.tasksName.titleName} buttontransferName={MainConfig.tasksName.buttontransferName} buttontransferIcon={MainConfig.tasksName.buttontransferIcon} link={MainConfig.tasksName.link} />
        
          <Section vertical={MainConfig.sectiongrid.vertical} horizontal={MainConfig.sectiongrid.horizontal}> {/* Блоки заданий */}
            <TaskBlock />
          </Section>
        </Section>
    </div>
  );
} 
