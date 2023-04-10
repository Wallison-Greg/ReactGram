import {api, requestConfig} from "../utils/config";

// Register an user 

const register = async(data) => {
    const config = requestConfig("POST", data);

    try {
        
        const res = await fetch(api + "/users/register", config).then((res)=> res.json()).catch((err) => err)

        if(res){
            localStorage.setItem("user", JSON.stringify(res));
        }

    } catch (error) {
        console.log(error)
    }
};

const authService = {
    register,
};

export default authService;


//a pasta service tem como objetivo realizar a ligação entre o back-end e front-end acessando a api
