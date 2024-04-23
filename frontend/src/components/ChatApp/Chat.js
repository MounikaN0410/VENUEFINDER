import React, { useEffect } from 'react'
import { CometChat } from "@cometchat-pro/chat";
import { CometChatUI } from "./CometChatWorkspace/src";

const Chat = () => {
    // useEffect(() => {
    //     const appID = "237597f7f918f575";
    //     const region = "US";
    //     const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    //     CometChat.init(appID, appSetting).then(
    //         () => {
    //             console.log("Initialization completed successfully");
    //             // You can now call login function.
    //         },
    //         error => {
    //             console.log("Initialization failed with error:", error);
    //             // Check the reason for error and take appropriate action.
    //         }
    //     );
    //     let authKey = "c555e768701e08c5d1049279940d5cbd8baccb6c";
    //     var uid = "user1";
    //     var name = "Maitreya";

    //     var user = new CometChat.User(uid);
    //     user.setName(name);
    //     CometChat.createUser(user, authKey).then(
    //         user => {
    //             console.log("user created", user);
    //         }, error => {
    //             console.log("error", error);
    //         }
    //     )


    //     CometChat.login(uid, authKey).then(
    //         user => {
    //             console.log("Login Successful:", { user });
    //         },
    //         error => {
    //             console.log("Login failed with exception:", { error });
    //         }
    //     );
    // }, [])
    useEffect(() => {
        console.log("CometChatUI");
    }, [])

    return (
        <div>hi</div>
        // <div className='flex-grow-1'><CometChatUI /></div>
    )
}

export default Chat