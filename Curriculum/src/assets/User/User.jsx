import AutoResizeTextarea  from"./Components/AutoResizeTextarea";
import ImageUploader  from"./Components/ImageUploader";
import Button  from"./Components/Button";
import Axios from 'axios';
import ModalCSK  from"./Components/ModalCSK";
import ModalUploadProjects  from"./Components/ModalUploadProjects";
import FormatDelete from"./Components/FormatDelete";
import FormatDeleteProject from"./Components/FormatDeleteProject";




const API_URL = import.meta.env.VITE_API_URL;
import React, { useEffect, useState } from "react";



function User(){
    const [modalType, setModalType] = useState(null);

    const [certification, setCertification] = useState([]);
    const [tecnology, setTecnology] = useState([]);
    const [project, setProject] = useState([]);
    
    const [Skill, setSkill] = useState([]);
    const [SelectSkill, setSelectSkill] = useState([]); // Estado para almacenar el modelo seleccionado
  
  
  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);
  
  const [isModalOpen2, setIsModalOpen2] = useState(false);

    const openModal2 = () => setIsModalOpen2(true);
    const closeModal2 = () => setIsModalOpen2(false);

    const[name, setname] = useState("");
    const[description, setdescription] = useState("");
    const[cv, setvc] = useState("");
    
    const uploadUrls = {
    certification: `${API_URL}/uploadcertification`,
    skill: `${API_URL}/uploadskill`,
    technology: `${API_URL}/uploadtechnology`,
  };
    

    const userId = localStorage.getItem('userId'); // Obtiene el ID del usuario del localStorage

        const UpdateUserInfo = async (event) => {
        event.preventDefault();
        try {
            const payload = { id_user: userId };
            if (name) payload.name = name;
            if (description) payload.description = description;
            if (cv) payload.cv = cv;

            const response = await Axios.post(`${API_URL}/info`, payload);

            console.log("Respuesta backend:", response.data);
            if (response.data.status === "Success") {
            alert("Información actualizada correctamente");
            } else {
            alert("Error al actualizar la información");
            
            
            console.error("Error:", response.data.Error);
            }
        } catch (error) {
             
            console.error("Error al actualizar la información:", error);
            alert("Error al actualizar la información");
            
        }
        };


        const[github, setgithub] = useState("");
        const[email, setemail] = useState("");
        const[instagram, setinstagram] = useState("");

        const UpdateContactInfo = async (event) => {
        event.preventDefault();
        try {
            const payload = { id_user: userId };
            if (github) payload.github = github;
            if (email) payload.email = email;
            if (instagram) payload.instagram = instagram;

            const response = await Axios.post(`${API_URL}/contact`, payload);

            console.log("Respuesta backend:", response.data);
            if (response.data.status === "Success") {
            alert("Contacto actualizado correctamente");
            } else {
            alert("Error al actualizar contacto");
            
            
            console.error("Error:", response.data.Error);
            }
        } catch (error) {
             
            console.error("Error al actualizar contacto:", error);
            alert("Error al actualizar la información");
            
        }
        };

            useEffect(() => {
                getSkill();
                getMySkills(); // obtiene las que el usuario ya tiene
                getCertificate();
                getTechnology();
                getProject();
            }, []); 

            const Recargar = () => {
            getSkill();
            getMySkills();
            getCertificate();
            getTechnology();
            getProject();
            };


        const getSkill = () => {
            Axios.get(`${API_URL}/skill`).then((response)=>{
                setSkill(response.data);
            });
        }

        const getMySkills = async () => {
            try {
                const response = await Axios.get(`${API_URL}/myskill/${userId}`);
                setSelectSkill(response.data); // aquí pones las ya seleccionadas
            } catch (error) {
                console.error('Error al obtener habilidades del usuario:', error);
            }
        };

        const getCertificate = () => {
           Axios.get(`${API_URL}/certification`).then((response)=>{
               setCertification(response.data);
           });
       }
        const getTechnology = () => {
           Axios.get(`${API_URL}/technologies`).then((response)=>{
               setTecnology(response.data);
           });
       }
        const getProject = () => {
        Axios.get(`${API_URL}/projects`).then((response) => {
            const rawData = response.data;

            // Agrupar por id_projects
            const groupedProjects = rawData.reduce((acc, item) => {
            const projectId = item.id_projects;

            if (!acc[projectId]) {
                acc[projectId] = {
                id_projects: item.id_projects,
                title: item.title,
                description: item.description,
                id_user: item.id_user,
                images: []
                };
            }

            if (item.image_url) {
                acc[projectId].images.push(`${API_URL}/uploads/${item.image_url}`);
            }

            return acc;
            }, {});

            // Convertir a array
            setProject(Object.values(groupedProjects));
        });
        };

         const handleDelete = (id) => {
            Axios.delete(`${API_URL}/projects/${id}`).then(() => {
            getProject(); // Refresca la lista después de borrar
            }).catch(err => {
            console.error("Error eliminando:", err);
            });
        };
        
        const handleDeleteCertification = (id) => {
           Axios.delete(`${API_URL}/certificate/${id}`).then(() => {
           getCertificate(); // Refresca la lista después de borrar
           }).catch(err => {
           console.error("Error eliminando:", err);
           });
       };

       const handleDeleteSkill = (id) => {
  Axios.delete(`${API_URL}/skills/${id}`)
    .then(() => {
      getSkill(); // Asumiendo que tienes una función para refrescar la lista de skills
    })
    .catch(err => {
      console.error("Error eliminando skill:", err);
    });
};

const handleDeleteTechnology = (id) => {
  Axios.delete(`${API_URL}/technologies/${id}`)
    .then(() => {
      getTechnology(); // Asumiendo que tienes una función para refrescar la lista de technologies
    })
    .catch(err => {
      console.error("Error eliminando technology:", err);
    });
};







    return(

        <div className="flex flex-col min-h-screen w-full bg-gray-900 text-white text-center">
            
            <h1 className="text-4xl font-bold text-blue-500 mt-6">WELCOME DAMIAN</h1>
            

            <div className="flex items-center justify-center mt-30">
                <div className=" bg-gray-800 rounded-2xl shadow-lg p-8 text-white mx-auto  w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]">
                    <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1>
                    <h2 className="text-xl font-bold mb-4 text-left ">Name</h2>
                    <AutoResizeTextarea value={name} onChange={(e) => setname(e.target.value)} />
                    <h2 className="text-xl font-bold mb-4 text-left ">Description</h2>
                    <AutoResizeTextarea value={description} onChange={(e) => setdescription(e.target.value)} />
                    <h2 className="text-xl font-bold mb-4 text-left ">CV</h2>
                    <AutoResizeTextarea value={cv} onChange={(e) => setvc(e.target.value)} />
                    <Button text="Update" onClick={UpdateUserInfo}/>

                    <h1 className="text-2xl font-bold mt-5 mb-6 text-center">Contact Profile</h1>
                    <h2 className="text-xl font-bold mb-4 text-left ">Github link</h2>
                    <AutoResizeTextarea value={github} onChange={(e) => setgithub(e.target.value)} />
                    <h2 className="text-xl font-bold mb-4 text-left ">Email</h2>
                    <AutoResizeTextarea value={email} onChange={(e) => setemail(e.target.value)} />
                    <h2 className="text-xl font-bold mb-4 text-left ">instagram</h2>
                    <AutoResizeTextarea value={instagram} onChange={(e) => setinstagram(e.target.value)} />
                    <Button text="Update" onClick={UpdateContactInfo}/>

                    <h2 className="text-xl font-bold mb-4 text-left mt-5">IMAGE</h2>
                    <div className="flex items-center justify-center">
                    <ImageUploader
                    uploadUrl={`${API_URL}/uploadProfile`}
                    userId={userId}
                    onUploadSuccess={(data) => console.log("Imagen subida:", data)}
                    />
                    </div>
                    <h2 className="text-xl font-bold mb-4 text-left mt-5">PROJECTS</h2>
                        <div className=" bg-gray-700 rounded-2xl shadow-lg p-8 text-white mx-auto  w-[100%]">
                        <div className="flex flex-wrap justify-center items-center">
                            {project.map(pj => (
                                <FormatDeleteProject key={pj.id_projects} imageList={pj.images} tittle={pj.title} onDelete={() => handleDelete(pj.id_projects)}
                            />))}
                            

                            </div>
                        </div>
                        <div>
                            <Button text="Add project " onClick={openModal2}/>
                        </div>
                    <h2 className="text-xl font-bold mb-4 text-left mt-5">Certifications</h2>
                    <div className=" bg-gray-700 rounded-2xl shadow-lg p-8 text-white mx-auto  w-[100%]">
                        <div className="flex flex-wrap justify-center items-center">
                        {certification.map(cer => (
                            <FormatDelete key={cer.id_certificates} imageSrc={`${API_URL}/uploads/${cer.image}` } onDelete={() => handleDeleteCertification(cer.id_certificates)}
                        />))}
                        </div>
                        <div>
                        <Button text="Add certification"  onClick={() => openModal("certification")} />
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-4 text-left mt-5">My SKILLS</h2>
                    <div className=" bg-gray-700 rounded-2xl shadow-lg p-8 text-white mx-auto  w-[100%]">
                        {Skill.map((sk) => {
                            const idStr = sk.id_skills.toString();
                            return (
                            <label key={idStr} className="flex items-center space-x-3 cursor-pointer group">
                                <div className="w-5 h-5 rounded border-2 border-gray-400 group-hover:border-blue-500 flex items-center justify-center transition-all duration-200">
                                <input
                                    type="checkbox"
                                    value={idStr}
                                    checked={SelectSkill.includes(idStr)}
                                    onChange={async (e) => {
                                    const selectedId = e.target.value;
                                    const isChecked = e.target.checked;

                                    try {
                                        if (isChecked) {
                                        // Agrega al backend
                                        await Axios.post(`${API_URL}/myskill`, {
                                            userId,
                                            selectedSkills: [selectedId]
                                        });
                                        setSelectSkill([...SelectSkill, selectedId]);
                                        } else {
                                        // Elimina del backend
                                        await Axios.delete(`${API_URL}/myskill`, {
                                            data: { userId, idSkill: selectedId }
                                        });
                                        setSelectSkill(SelectSkill.filter(id => id !== selectedId));
                                        }
                                    } catch (error) {
                                        console.error("Error al actualizar habilidad:", error);
                                        alert("Ocurrió un error al actualizar tus habilidades");
                                    }
                                    }}

                                    className="hidden peer"
                                />
                                <div className="w-2.5 h-2.5 bg-blue-500 rounded opacity-0 peer-checked:opacity-100 transition-opacity duration-150"></div>
                                </div>
                                <span className="text-white group-hover:text-blue-300 transition-colors">{sk.name}</span>
                            </label>
                            );
                        })}
                    </div>
                    <h2 className="text-xl font-bold mb-4 text-left mt-5">SKILLS</h2>
                    <div className=" bg-gray-700 rounded-2xl shadow-lg p-8 text-white mx-auto  w-[100%]">
                        <div className="flex flex-wrap justify-center items-center">
                            {Skill.map(sk => (
                                <FormatDelete key={sk.id_skills} imageSrc={`${API_URL}/uploads/${sk.filename}`} onDelete={() => handleDeleteSkill(sk.id_skills)}
                            />))}
                        </div>
                        <Button text="Add Skill" onClick={() => openModal("skill")}/>
                    </div>
                    <h2 className="text-xl font-bold mb-4 text-left mt-5">Technology</h2>
                    <div className=" bg-gray-700 rounded-2xl shadow-lg p-8 text-white mx-auto  w-[100%] mb-5">
                        <div className="flex flex-wrap justify-center items-center">
                        {tecnology.map(tec => (
                            <FormatDelete key={tec.id_technologies} imageSrc={`${API_URL}/uploads/${tec.icon}`} onDelete={() => handleDeleteTechnology(tec.id_technologies)}
                        />))}
                        </div>
                        <Button text="Add Technology" onClick={() => openModal("technology")}/>
                    </div>
                    <Button text="Reload"   onClick={Recargar} />
                    



                </div>

            </div>
                  <ModalCSK
                    isOpen={modalType !== null}
                    onClose={closeModal}
                    uploadUrl={uploadUrls[modalType]}
                    userId={userId}
                    onUploadSuccess={(data) => {
                    console.log(`Subida exitosa en ${modalType}:`, data);
                    closeModal();
                    }}/>

                    <ModalUploadProjects 
                    isOpen={isModalOpen2}
                    onClose={closeModal2}
                    onUploadSuccess={(data) => console.log("Project uploaded:", data)}


                    />


        </div>
        
    );
}
export default User;