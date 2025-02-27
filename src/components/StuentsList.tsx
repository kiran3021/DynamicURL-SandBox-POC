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
import { studentsData } from "./bin/studentData";
const loader = () => {

}
interface MentorTyeps {
  id: number;
}
function StudentList({ id }: MentorTyeps) {
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
  const isPending = false;
  // const { status, isSuccess, data, error, isError, fetchStatus, isPending, isFetching, isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } =
  //   useInfiniteQuery({
  //     queryKey: ["students"],
  //     queryFn: async ({ pageParam }) => getMentor({ pageParam }),
  //     initialPageParam: currentPage,
  //     getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
  //       if (firstPageParam <= 1) {
  //         return undefined;
  //       }
  //       return firstPageParam - 1;
  //     },
  //     getNextPageParam: (lastPage, allPages, lastPageParam) => {
  //       console.log({ lastPage });
  //       console.log({ allPages });
  //       console.log({ lastPageParam });
  //       if (lastPage.nextId > lastPage.data.total) {
  //         return undefined;
  //       }
  //       return lastPageParam + 1;
  //     },
  //     maxPages: 1,
  //   });
  const [paginationData, setPaginationData] = useState<DataType[]>([]);
  // console.log(data);
  // useEffect(() => {
  //   if (isPending) {
  //     return;
  //   }
  //   setPaginationData(data?.pages[0].data?.users);
  //   setCurrentPage(data?.pageParams);

  // }, [currentPage, data, isSuccess]); // Correct dependency
  // console.log(data)
  // if (isError) {
  //   return <span>Erro {error.message}</span>;
  // }

  // const handleInputChange = (e) => {
  //   setInputPage(e.target.value);
  // };

  // const handleGoToPage = async () => {
  //   const pageNumber = parseInt(inputPage, 10);
  //   const res = await getMentor({ pageParam: pageNumber });

  //   if (!isNaN(pageNumber) && pageNumber > 0) {
  //     navigate(`/mentors/${pageNumber}`);
  //     setCurrentPage(pageNumber);
  //   } else {
  //     alert("Please enter a valid page number.");
  //   }
  // };

  return (
    <div className="mentors">
      {/* <a className="visually-hidden-focusable" href="#content">
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
            <strong role="status" className="">Loading...</strong>
          </div>
        </div>
      ) : (
        <>
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-10 col-md-12 mx-auto bg-white rounded shadow">
                {/* <div className="table-responsive-sm table-responsive-md table-responsive-lg table-responsive"> */}
                <div className="table-responsive table-responsive-lg table-responsive-md table-responsive-sm">
                  {/* <div className="add-button">
                    <Link to={'/mentors/create'} className="Button violet caption-top">
                      <span>Student List..</span>
                    </Link>
                  </div> */}
                  <table className="table table-fixed table-hover caption-top align-middle">
                    <caption>List of Students</caption>
                    <thead className="table-head">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col" className="col-md-2">Name</th>
                        <th scope="col">Projects</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Score</th>
                        <th scope="col">Attendence(%)</th>
                        <th scope="col">MentorId</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {studentsData.map((ele, index: number) => (
                        <tr key={ele.id}>
                          <th scope="row">{ele.id}</th>
                          <td className="col-3 col-md-2">
                            <span className=""> {ele.firstName} {ele.lastName} Name</span>
                          </td>
                          <td> {ele.age}</td>
                          <td> {ele.email}</td>
                          <td> {ele.phone}</td>
                          <td>{ele.gender}</td>
                          <td>
                            <Link to={`/mentors/${ele.mentorId}/details`} className="link-details">
                              {ele.mentorId}
                            </Link>
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

            {/* <div className="page-wrap row d-flex justify-content-center align-items-center">
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
                    <li className="page-item">
                      <button
                        type="button"
                        role="button"
                        className="page-link active"
                      >
                        {data.pageParams}
                      </button>
                    </li>
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
            </div> */}
            {/* <div className="page-wrap row d-flex justify-content-center align-items-center">
              <div className="col-4">
                <input
                  id="search-page"
                  type="text"
                  value={inputPage}
                  onChange={handleInputChange}
                  onBlur={handleGoToPage}
                  className="form-control me-2 p-1"
                  placeholder="Page #"
                  aria-label="Page number"
                />
              </div>
              <div className="col-5">
                <button
                  type="submit"
                  className="Button mauve px-2"
                  onClick={handleGoToPage}
                >
                  Go To Page
                </button>
              </div>
            </div> */}
          </div>
          {/* <div className="justify-content-center">
            <span>{isFetching && !isFetchingNextPage ? "Background Updating..." : null}</span>
          </div> */}
        </>
      )}
    </div>
  );
}

export default StudentList;
