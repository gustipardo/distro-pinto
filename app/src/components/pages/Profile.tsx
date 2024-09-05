import React from "react";
import { Card } from "../ui/card";
import { Register } from "../Register";
import { UserInfo } from "../UserInfo";
import { UserList } from "../UsersList";

export const Profile: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <Card className="w-full md:w-1/2 block justify-center items-center">
                <UserInfo />
                <Register />
            </Card>
            <Card className="w-full md:w-1/2 flex justify-center items-center p-4">
                <UserList />
            </Card>
        </div>
    );
};
