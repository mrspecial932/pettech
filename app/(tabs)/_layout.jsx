import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { useLanguage } from '../../context/languagecontext';

const TabsLayout = () => {

    const { translate } = useLanguage(); // Access the translate function
    const [tabLabels, setTabLabels] = useState({});

    // Fetch translations when the component mounts or language changes
    useEffect(() => {
        const fetchTranslations = async () => {
            const labels = {
                home: await translate('Home'),
                search: await translate('Search'),
                setting: await translate('Setting'),
            };
            setTabLabels(labels);
        };

        fetchTranslations();
    }, [translate]);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "black",
            }}
        >
             <Tabs.Screen
                name="Home"
                options={{
                    tabBarLabel: tabLabels.home || 'Home',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons
                            name="home"
                            size={30}
                            color="black"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarLabel: tabLabels.search || 'Search',
                    tabBarIcon: ({ color }) => (
                      <FontAwesome name="search" size={30} color="black" />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarLabel: tabLabels.setting || 'setting', 
                    tabBarIcon: () => (
                      <Feather name="settings" size={30} color="black" />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;