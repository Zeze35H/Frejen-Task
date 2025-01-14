import { Metadata, } from 'next';

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "Profile",
        description: "Profile page",
    };
}

export { default } from './ProfilePage'