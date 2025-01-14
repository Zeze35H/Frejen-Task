import { Metadata, } from 'next';

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "Login",
        description: "Login page",
    };
}

export { default } from './LoginPage'