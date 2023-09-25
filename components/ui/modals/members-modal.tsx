"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from '@/hooks/use-modal-store';
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useState } from "react";

const roleIconMap = {
  "GUEST": null,
  "MODERATOR" : <ShieldCheck  className="h-4 w-4 ml-2 text-indigo-500" />,
  "ADMIN": <ShieldAlert  className="h-4 w-4 text-rose-600" />,
}

export const MembersModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const [loadingId, setloadingId] = useState("");


  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: ServerWithMembersWithProfiles };


  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black  overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription
          className="text-center text-sm text-neutral-600 dark:text-neutral-700 px-6 pb-8"
          >
          {server?.members?.length } Members
        </DialogDescription>
        </DialogHeader>
        
        <ScrollArea 
          className="mt-8 max-h-[430px] pr-6"
        >
          {
            server?.members?.map((member) => (
              <div
                className="flex items-center gap-x-2 mb-6"
              >
                <UserAvatar 
                  src={member.profile.imageUrl}
                />
                <div
                  className="flex flex-col gap-y-1"
                > 
                  <div
                    className="flex text-sm font-semibold gap-x-2.5"
                  >
                    {member.profile.name} { roleIconMap[member.role] }
                  </div>
                  <p className="text-xs text-zinc-500" > {member.profile.email} </p>
                </div>
                { server.profileId !== member.profileId &&
                  loadingId !== member.id && (
                    <div>actions</div>
                  )
                }
              </div>

            ))
          }
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
