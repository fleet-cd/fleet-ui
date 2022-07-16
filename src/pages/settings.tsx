import type { NextPage } from "next";
import Card from "../components/Cards/Card/Card";
import Tabs from "../components/Tabs/Tabs";
import Tab from "../components/Tabs/Tab";
import UserSearcb from "../modules/UserSearch/UserSearch";

const Settings: NextPage = () => {
    return (
        <Card>
            <Tabs>
                <Tab key="me" name="Me">asdf</Tab>
                <Tab key="users" name="Users"><UserSearcb /></Tab>
                <Tab key="other" name="Other">asdf3</Tab>
            </Tabs>
        </Card>
    );
};

export default Settings;
