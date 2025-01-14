import { Metadata, } from 'next';

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "Homepage",
        description: "Homepage",
    };
}

export { default } from './HomePage'