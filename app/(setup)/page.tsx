// @flow 
import { initialProfile } from '@/lib/initial-profile';
import * as React from 'react';
import { db } from '../../lib/db';
import { redirect } from 'next/dist/server/api-utils';
import { InitialModal } from '@/components/ui/modals/initial-model';


const SetupPage = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    });

    if(server) {
        return redirect(`/servers/${server.id}`);
    }


    return (
        <InitialModal></InitialModal>
    );
};

export default SetupPage;