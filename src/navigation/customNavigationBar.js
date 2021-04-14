import React, { useState } from 'react';

import { Appbar, Menu } from 'react-native-paper';

function CustomNavigationBar({ navigation, previous, scene }) {
    const { options } = scene.descriptor;
    const title = options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;

    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Appbar.Header>
            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />
            {!previous ? (
                <Menu visible={visible} onDismiss={closeMenu} anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}>
                    <Menu.Item onPress={() => {closeMenu(); navigation.navigate('VV')}} title="VV" />
                    <Menu.Item onPress={() => {closeMenu(); navigation.navigate('Settings')}} title="Settings" />
                </Menu>
            ) : null}
        </Appbar.Header>
    );
}

export default CustomNavigationBar;