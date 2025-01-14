import { Metadata, } from 'next';

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "ERROR",
        description: "Error page",
    };
}

export { default } from './ErrorPage'