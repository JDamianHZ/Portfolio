import React, { useEffect, useState } from "react";import Header  from"./Header";
import ImageU from"../ImagesPanel/GifDevelop.gif";
import CertificatesIcon from"../ImagesPanel/certificates.png";
import SkillsIcon from"../ImagesPanel/Skills.png";
import ProjectsIcon from"../ImagesPanel/IconProjects.png";
import GitHubIcon from"../ImagesPanel/git.png";
import InstagramIcon from"../ImagesPanel/insta.png";
import MailIcon from"../ImagesPanel/mail.png";
import TypingAnimation from"../User/Components/TypingAnimation";
import ButtonNeon from"../User/Components/ButtonNeon";
import ButtonIcon from"../User/Components/ButtonIcon";
import ProjectFormat from"../User/Components/ProjectFormat";
import CertificateFormat from"../User/Components/CertificateFormat";
import ModalProject  from"../User/Components/ModalProject";
import ModalCertificate  from"../User/Components/ModalCertificate";
import FormatSkill  from"../User/Components/FormatSkill";
import Axios from"axios";
import SectionMotion from "../User/Components/SectionMotion";



const API_URL = import.meta.env.VITE_API_URL;



function Panel(){
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isModalOpen2, setIsModalOpen2] = useState(false);
        const [info, SetInfo] = useState([]);
        const [imageUser, SetImageUser] = useState([]);
        const [ContactInfo, SetContactInfo] = useState([]);
        const [certification, setCertification] = useState([]);
        const [project, setProject] = useState([]);
        const [skill, setSkill] = useState([]);
        const [selectedCertificate, setSelectedCertificate] = useState(null);
        const [selectedProject, setSelectedProject] = useState(null);
        const [filter, setFilter] = useState("projects"); // valor inicial


        
        

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openModal2 = () => setIsModalOpen2(true);
    const closeModal2 = () => setIsModalOpen2(false);


    useEffect(() => {
        getInfo();
        getImageUser();
        getContactInfo();
        getCertificate();
        getProject();
        getskills();
    }, []); 

    const getInfo = () => {
        Axios.get(`${API_URL}/infoget`).then((response)=>{
            SetInfo(response.data);
        });
    }
    const getImageUser = () => {
        Axios.get(`${API_URL}/image_user`).then((response)=>{
            SetImageUser(response.data);
        });
    }
    const getContactInfo = () => {
        Axios.get(`${API_URL}/contactinfo`).then((response)=>{
            SetContactInfo(response.data);
        });
    }

    const getCertificate = () => {
        Axios.get(`${API_URL}/certification`).then((response)=>{
            setCertification(response.data);
        });
    }
    const getskills = () => {
        Axios.get(`${API_URL}/skillsWatch`).then((response)=>{
            setSkill(response.data);
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
                images: [],
                technologies: []
                };
            }

            if (item.image_url) {
                acc[projectId].images.push(`${API_URL}/uploads/${item.image_url}`);
            }

                       if (item.tech_icon && item.tech_name) {
            const techExists = acc[projectId].technologies.some(
                tech => tech.icon === `${API_URL}/uploads/${item.tech_icon}` && tech.name === item.tech_name
            );
            if (!techExists) {
                acc[projectId].technologies.push({
                icon: `${API_URL}/uploads/${item.tech_icon}`,
                name: item.tech_name
                });
            }
            }

            return acc;
            }, {});

            // Convertir a array
            setProject(Object.values(groupedProjects));
        });
    };

return(
    <div className="flex flex-col min-h-screen w-full bg-gray-900 text-white text-center ">
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <div className="absolute w-full h-full animate-scroll bg-gradient-radial from-blue-500/10 via-transparent to-purple-500/10 blur-3xl"></div>
        </div>
        <Header/>
        <div className="flex flex-col items-center justify-center">
            <div className="flex md:flex-row flex-col md:items-start items-center justify-center md:gap-x-120 mt-30 w-[95%]">  
                <div className=' md:mt-15 items-start md:w-auto w-full' >
                    <h1 className="md:text-5xl text-4xl font-bold text-white mt-6">SOFTWARE</h1>
                    <h1 className="md:text-7xl text-5xl font-bold text-blue-500">ENGINEER</h1>
                    <TypingAnimation
                        text="Developer with a passion for creating innovative solutions."
                        speed={40}
                        className="md:text-base text-xs font-bold  md:text-left text-center mt-5"
                    />
                    
                </div>
                <div className="flex items-center justify-center mt-6 md:mt-0 md:w-auto w-full">
                    <img src={ImageU} alt="Gif Developer" className="w-80 h-auto md:h-100 md:w-auto mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-left" />
                </div>
            </div>
        </div>

    <SectionMotion>
        <div  id="about-section">
            <div className="flex flex-col items-center justify-center  md:pt-100 pt-5">
                <h1 className="md:text-4xl text-2xl font-bold text-blue-500">ABOUT ME</h1>
            </div>

            <div className='flex flex-col items-center justify-center'>
                <div className="flex md:flex-row flex-col items-center justify-between md:justify-center w-[95%] max-w-6xl mx-auto py-8 gap-8">  
                    {/* Text section - will take half width on md screens */}
                    <div className='flex-1 md:max-w-[50%] w-full flex flex-col items-center md:items-start text-center md:text-left'>
                        <h1 className="md:text-5xl text-2xl font-bold text-blue-500">HELLO I'M</h1>
                        <h1 className="md:text-5xl text-xl font-bold text-white">{info[0]?.name || "Loading..."}</h1>
                        
                        <div className="w-full mt-5">
                            <div className='w-full bg-gray-800 rounded-2xl shadow-lg p-6 text-center md:text-left'>
                                {info[0]?.description || "Loading..."}
                            </div>
                        </div>
                        
                        <div className='mt-5'>
                            <ButtonNeon 
                                text="Download CV" 
                                onClick={() => window.open(info[0].cv, '_blank')} 
                            />
                        </div>
                    </div>
                    
                    {/* Image section - will take half width on md screens */}
                    <div className="flex-1 md:max-w-[50%] flex justify-center">
                        <img 
                            src={`${API_URL}/uploads/${imageUser[0]?.name_route || "Loading..."}`} 
                            alt="Myimage"
                            className="w-80 h-auto md:max-h-[500px] drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" 
                        />
                    </div>
                </div>
            </div>
        </div>
    </SectionMotion>
    <SectionMotion>
    <div  id="portfolio-section">
        <div className="flex flex-col items-center justify-center mt-10 md:pt-20 pt-20">
            <h1 className="md:text-4xl text-2xl font-bold text-blue-500">PORTFOLIO</h1>
        </div>
        <div className='flex flex-col items-center justify-cente mt-15'>
            <div className=" bg-gray-800 rounded-2xl shadow-lg  text-white mx-auto  w-[95%] ">
                <div className=" rounded-2xl shadow-lg  text-white h-full  w-[100%] md:w-[100%] p-4  gap-x-[2%] flex flex-row items-center justify-center">
                <ButtonIcon
                    text="PROJECTS"
                    icon={ProjectsIcon}
                    onClick={() => setFilter("projects")}
                />
                <ButtonIcon
                    text="CERTIFICATES"
                    icon={CertificatesIcon}
                    onClick={() => setFilter("certificates")}
                />
                <ButtonIcon
                    text="SKILLS"
                    icon={SkillsIcon}
                    onClick={() => setFilter("skills")}
                />
                </div>
            </div>
            <div className=" bg-gray-800 rounded-2xl shadow-lg  text-white mx-auto  w-[95%] mt-15  ">
                <div className='rounded-2xl shadow-lg  text-white h-full  w-[100%] md:w-[100%] p-4  gap-x-[2%] flex flex-wrap items-center justify-center'>
                    
             {filter === "projects" &&
                project.map(pj => (
                <ProjectFormat
                    key={pj.id_projects}
                    onClick={() => {
                    openModal();
                    setSelectedProject(pj);
                    }}
                    title={pj.title}
                    description={pj.description}
                    imageList={pj.images}
                    technologies={pj.technologies || []}
                />
                ))
            }

            {filter === "certificates" &&
                certification.map((cer, index) => (
                <CertificateFormat
                    key={index}
                    onClick={() => {
                    setSelectedCertificate(cer);
                    openModal2();
                    }}
                    imageSrc={`${API_URL}/uploads/${cer.image}`}
                />
                ))
            }

            {filter === "skills" && (

            skill.map((sk, index) => (
                <FormatSkill
                    key={index}
                    onClick={openModal2}
                    imageSrc={`${API_URL}/uploads/${sk.filename}`}
                />
                ))
                    
                
            )}
                    
                </div>
            </div>
        </div>
    </div>
    </SectionMotion>
    <SectionMotion>

    <div  id="contact-section">
         <div className="flex flex-col items-center justify-center  md:pt-20 ">
            <h1 className="md:text-4xl text-2xl font-bold text-blue-500">CONTACT</h1>
        </div>
        <div className='flex flex-col items-center justify-cente mt-15'>
            <div className=" bg-gray-800 rounded-2xl shadow-lg  text-white mx-auto  w-[95%] mb-5">
                <div className=" rounded-2xl shadow-lg  text-white h-full  w-[100%] md:w-[100%] p-4  gap-x-[2%] flex flex-row items-center justify-center">
                    <ButtonIcon text="GITHUB" icon={GitHubIcon} className="" onClick={() => window.open(ContactInfo[0].git_link, '_blank')}/>
                    <ButtonIcon text="INSTAGRAM" icon={InstagramIcon} className="" onClick={() => window.open(ContactInfo[0].instagram_link, '_blank')}/>
                    <ButtonIcon
                    text="Copy Email"
                    icon={MailIcon}
                    className=""
                    onClick={() => {
                        const email = ContactInfo[0]?.email_at;
                        if (email) {
                        navigator.clipboard.writeText(email)
                            .then(() => alert("Correo copiado al portapapeles"))
                            .catch(() => alert("Error al copiar el correo"));
                        } else {
                        alert("No hay correo para copiar");
                        }
                    }}
                    />

                </div>
            </div>
            
        </div>
        
    </div>
    </SectionMotion>

             <ModalProject
            isOpen={isModalOpen}
            onClose={closeModal}
            imageList={selectedProject?.images || []}
            title={selectedProject?.title || ''}
            description={selectedProject?.description || ''}
             icontech={selectedProject?.technologies || []}
            />
            
            <ModalCertificate
                isOpen={isModalOpen2}
                onClose={closeModal2}
                imageSrc={selectedCertificate ? `${API_URL}/uploads/${selectedCertificate.image}` : null}
            />


    </div>
)

}
export default Panel;
