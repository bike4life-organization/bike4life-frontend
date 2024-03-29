const ENDPOINT = `${process.env.REACT_APP_AUTH_API_URL}/users`

  export default function submitLogin(user: any){
    return fetch(`${ENDPOINT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.status === 200) {
        console.log("User logged in");
        return res.json()
      }}).then(res=>{
      const {token} = res
      return token
    });
  };
