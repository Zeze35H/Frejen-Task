import { Metadata, } from 'next';

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "Create Ticket",
        description: "Ticket Creation page",
    };
}

export { default } from './TicketCreatePage'