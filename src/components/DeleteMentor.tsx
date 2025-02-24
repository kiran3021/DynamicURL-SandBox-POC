import React, { useState, useEffect } from 'react';
import { AlertDialog, Dialog } from 'radix-ui';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMentor } from 'src/services/api/actionMentor';
interface DelteMentorTyeps {
    id: number,
    del: boolean
}

// function DeleteMentor({ id, del = false }: DelteMentorTyeps) {
//     const queryClient = useQueryClient();
//     const [alertOpen, setAlertOpen] = useState(false);

//     const { variables, status, isIdle: deleteIdle, mutate: deleteMutate, data: deltedData, isError: deleteError, isSuccess: deleteSuccess, isPending: deletePending, reset: deleteReset } = useMutation({
//         mutationKey: ["deleteMentor"],
//         mutationFn: async ({ id }) => deleteMentor({ id }),
//         onMutate: async (deletedRes) => {
//             await queryClient.cancelQueries({ queryKey: ["mentors"] });

//             const previousData = queryClient.getQueryData(['mentors']);
//             //
//             queryClient.setQueryData(['mentors'], (old) => ({
//                 ...old,
//                 pages: old?.pages?.map((page) => ({
//                     ...page,
//                     data: {
//                         ...page.data,
//                         users: page.data.users.filter((mentor) => mentor.id !== deletedRes.id),
//                     },
//                 })),
//             }));
//             return previousData;
//         },
//         onError: (error, variables, context) => {
//             console.log({ error }, { context })

//             queryClient.setQueryData(['mentors'], context?.prevousMentors)

//         },
//         onSuccess: (result, variables, content) => {

//             queryClient.setQueryData(['mentors'], (old) => ({
//                 ...old,
//                 pages: old?.pages?.map((page) => ({
//                     ...page,
//                     data: {
//                         ...page.data,
//                         users: page.data.users.filter((mentor) => mentor.id !== variables.id),
//                     },
//                 })),
//             }));

//         },
//         onSettled: () => {
//         }
//     })
//     const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         event.preventDefault(); // Prevent default behavior

//         // setSelectedMentorId(id);
//         // setAlertOpen(true);
//         deleteMutate({ id })
//     };
//     useEffect(() => {
//         let timer;
//         if (deleteSuccess) {
//             timer = setTimeout(() => {
//                 deleteReset();
//                 setAlertOpen(false);
//             }, 6000)
//         }
//         return () => clearTimeout(timer)

//     }, [deleteSuccess]);

//     return (
//         <div>
//             <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
//                 <AlertDialog.Trigger asChild>
//                     <button type="button" className={`Button red`}>
//                         Delete
//                     </button>
//                 </AlertDialog.Trigger>
//                 <AlertDialog.Portal>
//                     <AlertDialog.Overlay className={"Overlay"} />
//                     <AlertDialog.Content className={"Content"}>
//                         {del &&
//                             <div className="container text-center position-sticky top">
//                                 <div className="row py-1 mx-auto mb-2 bg-white rounded shadow w-100">
//                                     <span className="col-2">isIdle : </span>{" "}
//                                     <span className="col-2 bg-primary text-white border rounded-2">{deleteIdle ? "idle" : "No.."}</span>
//                                     <span className="col-2">isPending : </span>{" "}
//                                     <span className="col-2 bg-primary text-white border rounded-2"> {deletePending ? "Pending" : "No.."}</span>
//                                     <span className="col-2">isSuccess : </span>{" "}
//                                     <span className="col-2 bg-primary text-white border rounded-2">{deleteSuccess ? "True" : "False"}</span>
//                                     <span className="col-2">Status :</span>
//                                     <span className="col-2 bg-primary text-white border rounded-2">{status}</span>
//                                     <span className="col-2">Error :</span>
//                                     <span className="col-2 bg-primary text-white border rounded-2">{deleteError ? "Yes" : "No Error"}</span>
//                                 </div>
//                             </div>
//                         }
//                         <AlertDialog.Title className={"Title"}>Are you absolutely sure?</AlertDialog.Title>
//                         <AlertDialog.Description className={"Description"}>
//                             This action cannot be undone. This will permanently delete your account and remove your data from our servers.
//                         </AlertDialog.Description>
//                         <form >
//                             <div
//                                 style={{
//                                     display: "flex",
//                                     gap: 25,
//                                     justifyContent: "flex-end",
//                                 }}>
//                                 <AlertDialog.Cancel asChild>
//                                     <button type="button" className={"Button mauve"}>
//                                         Cancel
//                                     </button>
//                                 </AlertDialog.Cancel>
//                                 {/* <AlertDialog.Action > */}
//                                 <button type="button" className={`Button red`} onClick={(event) => { handleDelete(event) }}>
//                                     {deleteError && <>
//                                         <span>Error in Deleting</span> <span className='Button green'>Retry</span>
//                                     </>}
//                                     {deletePending ? "Deleting....." : (deleteSuccess ? "Deleted" : "Submit")}
//                                 </button>
//                                 {/* </AlertDialog.Action> */}
//                             </div>
//                         </form>
//                     </AlertDialog.Content>
//                 </AlertDialog.Portal>
//             </AlertDialog.Root>
//         </div>
//     )
// }

// export default DeleteMentor






const DeleteMentor = ({ id, del = false }: DelteMentorTyeps) => {
    const queryClient = useQueryClient();
    const [alertOpen, setAlertOpen] = useState(false);

    const { variables, status, isIdle: deleteIdle, mutate: deleteMutate, data: deltedData, isError: deleteError, isSuccess: deleteSuccess, isPending: deletePending, reset: deleteReset } = useMutation({
        mutationKey: ["deleteMentor"],
        mutationFn: async ({ id }) => deleteMentor({ id }),
        onMutate: async (deletedRes) => {
            await queryClient.cancelQueries({ queryKey: ["mentors"] });

            const previousData = queryClient.getQueryData(['mentors']);
            //
            queryClient.setQueryData(['mentors'], (old) => ({
                ...old,
                pages: old?.pages?.map((page) => ({
                    ...page,
                    data: {
                        ...page.data,
                        users: page.data.users.filter((mentor) => mentor.id !== deletedRes.id),
                    },
                })),
            }));
            return previousData;
        },
        onError: (error, variables, context) => {
            console.log({ error }, { context })

            queryClient.setQueryData(['mentors'], context?.prevousMentors)

        },
        onSuccess: (result, variables, content) => {

            queryClient.setQueryData(['mentors'], (old) => ({
                ...old,
                pages: old?.pages?.map((page) => ({
                    ...page,
                    data: {
                        ...page.data,
                        users: page.data.users.filter((mentor) => mentor.id !== variables.id),
                    },
                })),
            }));

        },
        onSettled: () => {
        }
    })
    const handleDelete = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default behavior

        // setSelectedMentorId(id);
        deleteMutate({ id })
        // setAlertOpen(true);
    };
    useEffect(() => {
        let timer;
        if (deleteSuccess) {
          timer =  setTimeout(() => {
                deleteReset();
                setAlertOpen(false);
            }, 8000)
        }
        return () => clearTimeout(timer)

    }, [deleteSuccess]);
    return (
        <Dialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
               <Dialog.Trigger asChild>
                   <button type="button" className="Button red">Delete</button>
                 </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='Overlay' />
                <Dialog.Content className='Content'>
                    {del &&
                        <div className="container text-center position-sticky top">
                            <div className="row py-1 mx-auto mb-2 bg-white rounded shadow w-100">
                                <span className="col-2">isIdle : </span>{" "}
                                <span className="col-2 bg-primary text-white border rounded-2">{deleteIdle ? "idle" : "No.."}</span>
                                <span className="col-2">isPending : </span>{" "}
                                <span className="col-2 bg-primary text-white border rounded-2"> {deletePending ? "Pending" : "No.."}</span>
                                <span className="col-2">isSuccess : </span>{" "}
                                <span className="col-2 bg-primary text-white border rounded-2">{deleteSuccess ? "True" : "False"}</span>
                                <span className="col-2">Status :</span>
                                <span className="col-2 bg-primary text-white border rounded-2">{status}</span>
                                <span className="col-2">Error :</span>
                                <span className="col-2 bg-primary text-white border rounded-2">{deleteError ? "Yes" : "No Error"}</span>
                            </div>
                        </div>
                    }
                    <Dialog.Title className="Title">Edit profile</Dialog.Title>
                    <Dialog.Description className="Description">
                        Make changes to your profile here. Deletet
                    </Dialog.Description>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleDelete(event);
                        }}
                    >
                        {/** some inputs */}
                        <div
                            style={{
                                display: "flex",
                                gap: 25,
                                justifyContent: "flex-end",
                            }}>
                            <Dialog.Close asChild>
                                <button type="button" className="Button mauve" aria-label="Close">Close</button>
                            </Dialog.Close>
                            {/* <AlertDialog.Action > */}
                            <button type="submit" className={`Button red`}>
                                {deleteError && <>
                                    <span>Error in Deleting</span> <span className='Button green'>Retry</span>
                                </>}
                                {deletePending ? "Deleting....." : (deleteSuccess ? "Deleted" : "Submit")}
                            </button>
                            {/* </AlertDialog.Action> */}
                        </div>
                    </form>
                    {/* <Dialog.Close asChild>
                        <button className="edit-iconButton text-center" aria-label="Close"><Cross2Icon /></button>
                    </Dialog.Close> */}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};


export default DeleteMentor;