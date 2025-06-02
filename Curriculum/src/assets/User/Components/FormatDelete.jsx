import Button  from"./Button";

const FormatDelete = ({ imageSrc, tittle, onDelete }) => {
 

  return (
        <div className="flex flex-col justify-center items-center m-2 md:w-[30%] w-full bg-gray-600 rounded-lg shadow-lg p-4">
        <div className="flex justify-center items-center mb-2 -50 w-full h-auto  rounded-lg shadow-lg overflow-hidden">
            {imageSrc && (
            <img
                src={imageSrc}
                alt="Project"
                className="h-50 w-auto object-contain"
            />
            )}
        </div>
        {tittle}
        <Button text="Delete" className="mt-2 text-white font-bold py-2 px-4 rounded" onClick={onDelete} />
        </div>


  );
}
export default FormatDelete;
