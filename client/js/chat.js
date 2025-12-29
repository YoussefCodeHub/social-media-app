const baseURL = "http://localhost:5000";
const token = `Bearer ${localStorage.getItem("token")}`;

let globalProfile = {};
const headers = {
  "Content-Type": "application/json; charset=UTF-8",
  authorization: token,
};
const clintIo = io(baseURL, {
  auth: { authorization: token },
});

clintIo.on("connect_error", (err) => {
  console.log("connect_error:", err.message);
});

clintIo.on("custom_error", (err) => {
  console.log("custom_error:", err.message);
});

clintIo.emit("sayHi", "FROM FE TO BE", (response) => {
  console.log({ response });
});

clintIo.on("likePost", (data) => {
  console.log({ likeData: data });
});

//images links
let userHasAvatar = false;
let friendHasAvatar = false;
let groupHasAvatar = false;

let defaultUserAvatar = userHasAvatar
  ? "./avatar/default-user.png"
  : "./avatar/Avatar-No-Background.png";

let defaultFriendAvatar = friendHasAvatar
  ? "./avatar/default-friend.png"
  : "./avatar/Avatar-No-Background.png";

let defaultGroupAvatar = groupHasAvatar
  ? "./avatar/default-group.png"
  : "./avatar/Avatar-No-Background.png";

let meImage = defaultUserAvatar;
let friendImage = defaultFriendAvatar;

// // collect messageInfo
function sendMessage(sendTo, type) {
  console.log({ sendTo, type });

  if (type == "ovo") {
    const data = {
      content: $("#messageBody").val(),
      sendTo,
    };
    console.log({ data });

    clintIo.emit("sendMessage", data);
  } else if (type == "group") {
    const data = {
      content: $("#messageBody").val(),
      groupId: sendTo,
    };
    clintIo.emit("sendGroupMessage", data);
  }
}

// // // // //sendCompleted
clintIo.on("successMessage", (data) => {
  const { content } = data;
  const div = document.createElement("div");

  div.className = "me text-end p-2";
  div.dir = "rtl";
  const imagePath = globalProfile.profilePicture
    ? globalProfile.profilePicture
    : defaultUserAvatar;
  div.innerHTML = `
    <img class="chatImage" src="${imagePath}" alt="" srcset="">
    <span class="mx-2">${content}</span>
    `;
  document.getElementById("messageList").appendChild(div);
  $(".noResult").hide();
  $("#messageBody").val("");
});

// // // // // // // // //receiveMessage
clintIo.on("newMessage", (data) => {
  console.log({ RM: data });
  const { content, from, groupId, chatId } = data;
  console.log({ from });
  let imagePath = defaultFriendAvatar;
  if (from?.profilePicture) {
    imagePath = from.profilePicture;
  }
  const onclickAttr = document
    .getElementById("sendMessage")
    .getAttribute("onclick");
  const [base, currentOpenedChat] =
    onclickAttr?.match(/sendMessage\('([^']+)'/) || [];
  console.log({ currentOpenedChat });
  console.log({ onclickAttr, currentOpenedChat });

  if (
    (!groupId && currentOpenedChat === from._id) ||
    (groupId && currentOpenedChat === groupId)
  ) {
    if (from._id.toString() != globalProfile._id.toString()) {
      const div = document.createElement("div");
      div.className = "myFriend p-2";
      div.dir = "ltr";
      div.innerHTML = `
    <img class="chatImage" src="${imagePath}" alt="" srcset="">
    <span class="mx-2">${content}</span>
    `;
      document.getElementById("messageList").appendChild(div);
    }
  } else {
    if (groupId) {
      $(`#g_${groupId}`).show();
    } else {
      $(`#c_${from._id}`).show();
    }
    const audio = document.getElementById("notifyTone");
    audio.currentTime = 0; // restart from beginning
    audio.play().catch((err) => console.log("Audio play blocked:", err));
  }
});

// // // ******************************************************************** Show chat conversation
function showData(sendTo, chat) {
  document
    .getElementById("sendMessage")
    .setAttribute("onclick", `sendMessage('${sendTo}' , "ovo")`);

  document.getElementById("messageList").innerHTML = "";
  console.log(chat);

  if (chat?.messages?.length) {
    $(".noResult").hide();
    for (const message of chat.messages) {
      if (message.createdBy.toString() == globalProfile._id.toString()) {
        const div = document.createElement("div");
        div.className = "me text-end p-2";
        div.dir = "rtl";
        div.innerHTML = `
                <img class="chatImage" src="${meImage}" alt="" srcset="">
                <span class="mx-2">${message.content}</span>
                `;
        document.getElementById("messageList").appendChild(div);
      } else {
        const div = document.createElement("div");
        div.className = "myFriend p-2";
        div.dir = "ltr";
        div.innerHTML = `
                <img class="chatImage" src="${friendImage}" alt="" srcset="">
                <span class="mx-2">${message.content}</span>
                `;
        document.getElementById("messageList").appendChild(div);
      }
    }
  } else {
    const div = document.createElement("div");

    div.className = "noResult text-center  p-2";
    div.dir = "ltr";
    div.innerHTML = `
        <span class="mx-2">Say Hi to start the conversation.</span>
        `;
    document.getElementById("messageList").appendChild(div);
  }

  $(`#c_${sendTo}`).hide();
}

// // // // // // // //get chat conversation between 2 users and pass it to ShowData fun
function displayChatUser(userId) {
  console.log({ userId });
  axios({
    method: "get",
    url: `${baseURL}/api/chat/user/${userId}/chat`,
    headers,
  })
    .then(function (response) {
      const { chat } = response.data?.data;
      console.log({ chat: response.data });
      if (chat) {
        if (
          chat.participants[0]._id.toString() == globalProfile._id.toString()
        ) {
          meImage = chat.participants[0].profilePicture
            ? chat.participants[0].profilePicture
            : defaultUserAvatar;
          friendImage = chat.participants[1].profilePicture
            ? chat.participants[1].profilePicture
            : defaultFriendAvatar;
        } else {
          meImage = chat.participants[1].profilePicture
            ? chat.participants[1].profilePicture
            : defaultUserAvatar;
          friendImage = chat.participants[0].profilePicture
            ? chat.participants[0].profilePicture
            : defaultFriendAvatar;
        }

        showData(userId, chat);
        clintIo.emit("openChat", { chatId: chat._id });
      } else {
        showData(userId, 0);
      }
    })
    .catch(function (error) {
      console.log(error);
      console.log({ status: error.status });
      if (error.status) {
        showData(userId, 0);
      } else {
        alert("Ops something went wrong");
      }
    });
}

// // // // ********************************************************************
// // // // ******************************************************************** Show  group chat conversation
function showGroupData(sendTo, chat) {
  document
    .getElementById("sendMessage")
    .setAttribute("onclick", `sendMessage('${sendTo}' , "group")`);

  document.getElementById("messageList").innerHTML = "";
  if (chat.messages?.length) {
    $(".noResult").hide();
    console.log(chat.messages);

    for (const message of chat.messages) {
      if (message.createdBy?._id.toString() == globalProfile._id.toString()) {
        const div = document.createElement("div");
        div.className = "me text-end p-2";
        div.dir = "rtl";
        div.innerHTML = `
                <img class="chatImage" src="${meImage}" alt="" srcset="">
                <span class="mx-2">${message.content}</span>
                `;
        document.getElementById("messageList").appendChild(div);
      } else {
        const div = document.createElement("div");
        div.className = "myFriend p-2";
        div.dir = "ltr";
        const friendImage = message.createdBy.profilePicture
          ? message.createdBy.profilePicture
          : defaultFriendAvatar;
        div.innerHTML = `
                <img class="chatImage" src="${friendImage}" alt="" srcset="">
                <span class="mx-2">${message.content}</span>
                `;
        document.getElementById("messageList").appendChild(div);
      }
    }
  } else {
    const div = document.createElement("div");

    div.className = "noResult text-center  p-2";
    div.dir = "ltr";
    div.innerHTML = `
        <span class="mx-2">Say Hi to start the conversation.</span>
        `;
    document.getElementById("messageList").appendChild(div);
  }
  $(`#g_${sendTo}`).hide();
}
// // // // // // // ********************************************************************
function displayGroupChat(groupId) {
  console.log({ groupId });
  axios({
    method: "get",
    url: `${baseURL}/api/chat/group/${groupId}`,
    headers,
  })
    .then(function (response) {
      const { chat } = response.data?.data;
      console.log({ chat });
      if (chat) {
        meImage = globalProfile.profilePicture
          ? globalProfile.profilePicture
          : defaultUserAvatar;
        showGroupData(groupId, chat);
        clintIo.emit("join_room", { roomId: chat.roomId });
      } else {
        showGroupData(groupId, 0);
      }
    })
    .catch(function (error) {
      console.log(error);
      console.log({ status: error.status });
      if (error.status) {
        showGroupData(groupId, 0);
      } else {
        alert("Ops something went wrong");
      }
    });
}
// // // ==============================================================================================

// // ********************************************************* Show Users list
// Display Users
function getUserData() {
  axios({
    method: "get",
    url: `${baseURL}/api/user/profile`,
    headers,
  })
    .then(function (response) {
      console.log({ D: response.data });

      const { user, friends, groups } = response.data?.data.profile;
      console.log({ user });

      globalProfile = user;
      let imagePath = defaultUserAvatar;
      if (user.profilePicture) {
        imagePath = user.profilePicture;
      }
      document.getElementById("profileImage").src = imagePath;
      document.getElementById("userName").innerHTML = `${user.fullName}`;
      showUsersData(friends);
      showGroupList(groups);
    })
    .catch(function (error) {
      console.log(error);
    });
}
// Show friends list
function showUsersData(users = []) {
  let cartonna = ``;
  for (let i = 0; i < users.length; i++) {
    let imagePath = defaultFriendAvatar;
    if (users[i].profilePicture) {
      imagePath = users[i].profilePicture;
    }
    cartonna += `
        <div onclick="displayChatUser('${users[i]._id}')" class="chatUser my-2">
        <img class="chatImage" src="${imagePath}" alt="" srcset="">
        <span class="ps-2">${users[i].fullName}</span>
        <span id="${"c_" + users[i]._id}" class="ps-2 closeSpan">
           🟢
        </span>
    </div>
        
        `;
  }

  document.getElementById("chatUsers").innerHTML = cartonna;
}

// // // // Show groups list
function showGroupList(groups = []) {
  let cartonna = ``;
  for (let i = 0; i < groups.length; i++) {
    let imagePath = defaultGroupAvatar;
    if (groups[i].group_image) {
      imagePath = groups[i].group_image;
    }
    cartonna += `
        <div onclick="displayGroupChat('${
          groups[i]._id
        }')" class="chatUser my-2">
        <img class="chatImage" src="${imagePath}" alt="" srcset="">
        <span class="ps-2">${groups[i].group}</span>
           <span id="${"g_" + groups[i]._id}" class="ps-2 closeSpan">
           🟢
        </span>
    </div>

        `;
    clintIo.emit("join_room", { roomId: groups[i].roomId });
  }

  document.getElementById("chatGroups").innerHTML = cartonna;
}
getUserData();
