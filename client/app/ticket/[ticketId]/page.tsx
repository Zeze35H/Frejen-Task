import { Metadata, } from 'next';

export async function generateMetadata({ params }: { params: { ticketId: string } }): Promise<Metadata> {

    return {
        title: `Ticket ${params.ticketId}`,
        description: `Ticket ${params.ticketId} page`,
    };
}

export { default } from './[TicketPage]'