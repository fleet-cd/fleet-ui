import type { NextPage } from "next";
import Card from "../components/Cards/Card/Card";
import Tabs from "../components/Tabs/Tabs";
import Tab from "../components/Tabs/Tab";
import UserSearcb from "../modules/UserSearch/UserSearch";
import GroupSearch from "../modules/GroupSearch/GroupSearch";
import NamespaceSearch from "../modules/NamespaceSearch/NamespaceSearch";
import EnvironmentSearch from "../modules/EnvironmentSearch/EnvironmentSearch";

const Settings: NextPage = () => {
    return (
        <Card>
            <Tabs>
                <Tab key="me" name="Me">asdf</Tab>
                <Tab key="namespaces" name="Namespaces"><NamespaceSearch /></Tab>
                <Tab key="users" name="Users"><UserSearcb /></Tab>
                <Tab key="groups" name="Groups"><GroupSearch /></Tab>
                <Tab key="envs" name="Environments"><EnvironmentSearch /></Tab>
            </Tabs>
        </Card>
    );
};

export default Settings;
