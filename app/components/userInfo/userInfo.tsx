import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Image,
} from "@radix-ui/react-avatar";
import { Link } from "@tanstack/react-router";
import avatar from "../../assets/avatar.svg";

interface UserInfoProps {
  user: User;
  className?: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user, className }) => {
  return (
    <Link to={`/users/${user.id}`} className="hover:opacity-80">
      <Card
        className={cn(
          "flex items-center gap-3 bg-white/10 backdrop-blur-sm border-0 outline-none",
          className
        )}
        
      >
        <CardContent className="flex items-center gap-3 p-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.profilePicture} alt="User avatar" />
            <AvatarFallback>
              <img src={avatar} alt="User avatar" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label className="text-sm font-medium">{user.name}</Label>
            <Label className="text-xs text-muted-foreground font-normal">
              {user.email}
            </Label>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
