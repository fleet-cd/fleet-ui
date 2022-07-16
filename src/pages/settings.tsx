import type { NextPage } from "next";
import Card from "../components/Cards/Card/Card";
import Tabs from "../components/Tabs/Tabs";
import Tab from "../components/Tabs/Tab";
import UserSearcb from "../modules/UserSearch/UserSearch";
import GroupSearch from "../modules/GroupSearch/GroupSearch";
import PermissionSearch from "../modules/PermissionSearch/PermissionSearch";

const Settings: NextPage = () => {
    return (
        <Card>
            <Tabs>
                <Tab key="me" name="Me">asdf</Tab>
                <Tab key="users" name="Users"><UserSearcb /></Tab>
                <Tab key="groups" name="Groups"><GroupSearch /></Tab>
                <Tab key="permissions" name="Permissions"><PermissionSearch /></Tab>
            </Tabs>
        </Card>
    );
};

export default Settings;
