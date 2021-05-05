import React from 'react';

import { Appbar } from 'react-native-paper';

function CustomNavigationBar({ navigation, previous, scene }) {
    const { options } = scene.descriptor;
    const title = options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;

    return (
        <Appbar.Header>
            {previous ? ( 
                <Appbar.BackAction onPress={navigation.goBack} /> 
            ) : (
                <Appbar.Action icon="cog" color="white" onPress={() => {navigation.openDrawer();}} /> 
            )}
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
}

export default CustomNavigationBar;