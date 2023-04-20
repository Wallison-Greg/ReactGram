import "./EditProfile.css"

import { uploads } from "../../utils/config";

//hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import {profile, resetMessage} from "../../slices/userSlice";

//components
import Message from "../../components/Message";

const EditProfile = () => {

    const dispatch = useDispatch();

    const {user, message, error, loading} = useSelector((state) => state.user);

    //satates
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [profileImage, setImageProfile] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    //load user data 
    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    //fill form with user data
    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio)
        }
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <div id="edit-profile">
        <h2>Edite o seu perfil</h2>
        <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
        {/* previl da imagem */}
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ""}/>
            <input type="email" placeholder="E-mail" disabled value={email || ""}/>
            <label>
                <span>Imagem do perfil:</span>
                <input type="file" />
            </label>
            <label>
                <span>Bio:</span>
                <input type="text" placeholder="Descrição do perfil" onChange={(e) => setBio(e.target.value)} value={bio || ""}/>
            </label>
            <label>
                <span>Alterar a Senha</span>
                <input type="password" placeholder="Nova Senha" onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
            </label>
            <input type="submit" value="Atualizar" />
        </form>
    </div>
  )
}

export default EditProfile