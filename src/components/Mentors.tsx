import React, { useEffect, useState } from "react";
import "./mentors.scss";
import EditMentor from "./EditMentor";
// import { data } from "./data";
import { DataType } from "./bin/data";
import Pagination from "./bin/Pagination";
import { AlertDialog } from "radix-ui";
import { useQuery, keepPreviousData, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMentor, getMentor, updateMentor } from "src/services/api/actionMentor";
import GlobalFetching from "../components/utilities/Globalfetching";
import axios from "axios";
import clsx from "clsx";
import { Link, useNavigate } from "@remix-run/react";
import EditRoute from "~/routes/mentors.edit";
import DeleteMentor from "./DeleteMentor";
import { useFetcher } from "@remix-run/react";
const loader = () => {

}
interface MentorTyeps {
  id: number;
}
function Mentors({ id }: MentorTyeps) {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(id ? parseInt(id) : 1);
  const queryClient = useQueryClient();
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState<number | null>(null);
  const navigate = useNavigate()
  const [inputPage, setInputPage] = useState();
  const fetcher = useFetcher()
  // useQuery for getting the data.
  // const useMentors = (limit:number,skip:number,) =>{
  //   const res = useQuery({
  //     queryKey: ["getMentors", skip, limit],
  //     queryFn:() => getMentor(limit,skip),
  //     placeholderData: keepPreviousData,

  //   });
  //   return res;
  // }

  const { status, isSuccess, data, error, isError, fetchStatus, isPending, isFetching, isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } =
    useInfiniteQuery({
      queryKey: ["mentors"],
      queryFn: async ({ pageParam }) => getMentor({ pageParam }),
      initialPageParam: currentPage,
      getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        console.log({ lastPage });
        console.log({ allPages });
        console.log({ lastPageParam });
        if (lastPage.nextId > lastPage.data.total) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      maxPages: 1,
    });

  // const { fetchStatus, status, isPending, isError, isSuccess, data, error,isFetching,isPlaceholderData  } = useMentors( 10,currentPage-1 *10,);
  const [paginationData, setPaginationData] = useState<DataType[]>([]);
  console.log(data);
  //  console.log({currentPage})
  useEffect(() => {
    if (isPending) {
      return;
    }
    // const res = data?.pages[0].data?.users.slice(
    //   (currentPage - 1) * rowsPerPage,
    //   currentPage * rowsPerPage
    // );

    setPaginationData(data?.pages[0].data?.users);
    setCurrentPage(data?.pageParams);

    // setPaginationData(res);
  }, [currentPage, data, isSuccess]); // Correct dependency
  console.log(data)
  if (isError) {
    return <span>Erro {error.message}</span>;
  }

  // const handleDelete = (id) => {

  //   setSelectedMentorId(id);
  //   setAlertOpen(true);
  //   deleteMutate({ id })
  // };
  // useEffect(() => {

  //   if (deleteSuccess) {
  //     setTimeout(() => {
  //       deleteReset();
  //       setAlertOpen(false);
  //     }, 5000)
  //   }

  // }, [deleteSuccess]);
  // const handlePageClick =(e) =>{
  //   setCurrentPage(e.target.value);
  //   navigate(`mentors/${e.target.value}`);

  // }

  // const { data, error, isLoading } = useQuery(
  //   ['mentors', currentPage],
  //   () => getMentor({ page: currentPage }),
  //   {
  //     keepPreviousData: true,
  //   }
  // )
  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };
  console.log({ inputPage })
  const handleGoToPage = async () => {
    const pageNumber = parseInt(inputPage, 10);
    const res = await getMentor({ pageParam: pageNumber });
    console.log(pageNumber)
    if (!isNaN(pageNumber) && pageNumber > 0) {
      navigate(`/mentors/${pageNumber}`);
      setCurrentPage(pageNumber);
      // queryClient.setQueryData(['mentors'], (old) => ({
      //   ...old,
      //   pages: old?.pages?.map((page) => ({
      //     ...page,
      //     data: {
      //       ...page.data,
      //       users: res,
      //     },
      //   })),
      // }));
      // Fetch data for the specified page here
    } else {
      alert("Please enter a valid page number.");
    }
  };
  // useEffect(() =>{
  //   console.log("refreshed id")

  // },[id])

  return (
    <div className="mentors" id="content">
      {/*
      <a className="visually-hidden-focusable" href="#content">
        Skip to main content
      </a> */}
      {/* <div className="container text-center position-sticky top">
        <div className="row py-2 mx-auto bg-white rounded shadow">
          <span className="col-4">FetchStatus : </span>{" "}
          <span className="col-2 bg-primary text-white border rounded-2">
            {" "}
            {fetchStatus}
          </span>
          <span className="col-4">Status :</span>
          <span className="col-2 bg-primary text-white border rounded-2">{status}</span>
        </div>
      </div> */}
      {isPending ? (
        <div className="text-center">
          <div className="d-flex g-5 mt-5 mx-auto p-2 align-content-center justify-content-center">
            <strong role="status" aria-live="polite" className="">Loading...</strong>
          </div>
        </div>
      ) : (
        <>
          <div className="container py-5">

            <div className="row">
              <div className="col-lg-10 col-md-12 mx-auto bg-white rounded shadow">
                {/* <div className="table-responsive-sm table-responsive-md table-responsive-lg table-responsive"> */}
                <div className="table-responsive table-responsive-lg table-responsive-md table-responsive-sm">
                  <div className="add-button">
                    <Link to={'/mentors/create'} className="Button gray caption-top" aria-label="create mentor">
                      {/* Add Mentor */}
                      <span>Add Mentor</span>
                    </Link>
                  </div>
                  <table className="table table-fixed table-hover caption-top align-middle" aria-live="assertive">
                    <caption>List of Mentors</caption>
                    <thead className="table-head">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col" className="col-md-2">Name</th>
                        <th scope="col">City</th>
                        <th scope="col">Country</th>
                        <th scope="col">Department</th>
                        <th scope="col">Role</th>
                        {/* <th scope="col"className="col-md-6 col-lg-2 col-sm-4 col">Phone</th> */}
                        <th scope="col">Phone</th>
                        {/* <th></th>
                        <th></th> */}
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {paginationData.map((ele: DataType, index: number) => (
                        <tr key={ele.id}>
                          <th scope="row">{ele.id}</th>
                          <td>
                            <Link to={`/mentors/${ele.id}/details`}>
                              <span className="link-details" aria-label="see the profile section"> {ele.firstName} {ele.lastName}</span>
                            </Link>
                          </td>
                          <td> {ele.address.city}</td>
                          <td> {ele.address.country}</td>
                          <td>{ele.company.department}</td>
                          <td>{ele.role}</td>
                          {/* <td className="col-md-3 phone-column" colspan={"5"} style={{ "width": "20%" }}>{ele.phone}</td> */}
                          <td>{ele.phone}</td>
                          {/* <td></td>
                           <td></td> */}
                          <td>
                            <EditMentor name={"Edit"} data={ele} edit={true} currentPage={currentPage} />
                          </td>
                          <td>
                            {/* <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
                              <AlertDialog.Trigger asChild>
                                <button type="button" className={`Button red`}>
                                  Delete
                                </button>
                              </AlertDialog.Trigger>
                              <AlertDialog.Portal>
                                <AlertDialog.Overlay className={"Overlay"} />
                                <AlertDialog.Content className={"Content"}>
                                  <AlertDialog.Title className={"Title"}>Are you absolutely sure?</AlertDialog.Title>
                                  <AlertDialog.Description className={"Description"}>
                                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                  </AlertDialog.Description>
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: 25,
                                      justifyContent: "flex-end",
                                    }}>
                                    <AlertDialog.Cancel asChild>
                                      <button type="button" className={"Button mauve"}>
                                        Cancel
                                      </button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action asChild>
                                      <button type="button" className={`Button red`} onClick={() => { handleDelete(ele.id ) }}>
                                        {deleteError && "Error In Deleteing"}
                                        {deletePending ? "Deleting....." : (deleteSuccess ? "Deleted" : "Submit")}
                                      </button>
                                    </AlertDialog.Action>
                                  </div>
                                </AlertDialog.Content>
                              </AlertDialog.Portal>
                            </AlertDialog.Root> */}
                            <DeleteMentor id={ele.id} del={true} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="page container d-flex flex-lg-row flex-md-column flex-sm-column gap-md-2 gap-sm-2 justify-content-center align-items-center mb-2">

            <div className="page-wrap row d-flex justify-content-center align-items-center">
              <div className="col-auto">
                <nav className="page" aria-label="page-navigation">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <button
                        role="button"
                        className={clsx("page-link", {
                          disabled: !hasPreviousPage || isFetchingPreviousPage,
                        })}
                        disabled={!hasPreviousPage || isFetchingPreviousPage}
                        onClick={() => fetchPreviousPage()}
                      >
                        {isFetchingPreviousPage
                          ? "Loading more..."
                          : hasPreviousPage
                            ? "Previous"
                            : "Nothing more to load"}
                      </button>
                    </li>
                    {/* {hasPreviousPage && (
                      <li className="page-item">
                        <button type="button" className="page-link">
                          {data.pageParams - 1}
                        </button>
                      </li>
                    )} */}
                    <li className="page-item">
                      <button
                        type="button"
                        role="button"
                        className="page-link active"
                      >
                        {data.pageParams}
                      </button>
                    </li>
                    {/* {hasNextPage && (
                      <li className="page-item">
                        <button type="button" className="page-link">
                          {parseInt(data.pageParams) + 1}
                        </button>
                      </li>
                    )} */}
                    <li className="page-item">
                      <button
                        type="button"
                        role="button"
                        className={clsx("page-link", {
                          disabled: !hasNextPage || isFetchingPreviousPage,
                        })}
                        onClick={() => {
                          navigate(`/mentors/${parseInt(currentPage) + 1}`);
                          fetchNextPage();
                        }}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <form role="search"  >
              <div className="page-wrap row d-flex justify-content-center align-items-center">
                {/* <div className=""> */}
                {/* <form  role="search" aria-label="search by page"> */}
                <div className="col-4">
                  <label htmlFor="search-page" aria-label="search" hidden></label>
                  <input
                    id="search-page"
                    aria-label="Search Page Number"
                    type="search"
                    value={inputPage}
                    onChange={handleInputChange}
                    onBlur={handleGoToPage}
                    className="form-control me-2 p-1"
                    placeholder="Page #"
                  />
                </div>
                <div className="col-5">

                  <button
                    type="button"
                    className="Button gray px-2"
                    onClick={handleGoToPage}
                  >
                    Go To Page
                  </button>
                </div>
                {/* </div> */}
              </div>
            </form>
            {/* </div> */}
            {/* </div> */}
          </div>
          {/* <fetcher.Form action={`/mentors/${inputPage}`}> */}
          {/* </fetcher.Form> */}
          {/* </div> */}
          <div className="justify-content-center">
            <span>{isFetching && !isFetchingNextPage ? "Background Updating..." : null}</span>
          </div>
          {/* {data && (
            <Pagination
              // dataLength={data?.total}
              rowsPerPage={rowsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              alwaysShown={false}
            />
          )} */}
        </>
      )}
    </div>
  );
}

export default Mentors
