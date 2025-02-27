import EditMentor from 'src/components/EditMentor';
import { Box, Container, } from '@radix-ui/themes';
import React, { useEffect, useState } from "react";
// import "./mentors.scss";
import '../../src/components/mentors.scss';
// import { data } from "./data";
// import { DataType } from "./data";
// import Pagination from "./Pagination";
import { AlertDialog } from "radix-ui";
import { useQuery, keepPreviousData, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMentor, getMentor, updateMentor } from "src/services/api/actionMentor";
// import GlobalFetching from "../components/utilities/Globalfetching";
import axios from "axios";
import clsx from "clsx";
import { Link, useActionData, useNavigate } from "@remix-run/react";
import { produce } from 'immer';
// import EditRoute from "~/routes/mentors.edit";
// import DeleteMentor from "./DeleteMentor";
import DeleteMentor from 'src/components/DeleteMentor';
import { Form } from '@remix-run/react';
import type { ActionFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { postMentor } from 'src/services/api/actionMentor';

interface EditMentorProps {
  name: string;
  data: any;
  edit: boolean;
  currentPage: number;
  openCreate: boolean;
}

// export async function action({
//   request,
// }: ActionFunctionArgs) {
//   const body = await request.formData();
//   const { data } = await postMentor(body);
//   return { data, message: "success" };
// }
// const loader = async ({ request, params }) => {
// };
// const action = ();
function CreateMentor({ openCreate = false, name, data = {}, edit = false, currentPage }: EditMentorProps) {
  // const result = useActionData();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState();
  const [validated, setValidated] = useState(false);
  const res = {
    id: data?.id || "",
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    address: {
      city: data?.address?.city || "",
      country: data?.address?.country || "",
    },
    company: {
      department: data?.company?.department || "",
    },
    role: data?.role || "",
    phone: data?.phone || "",
    ...data
  }
  const [formData, setFormData] = useState(res);

  const { mutate, isPending, isSuccess, isError, variables, isIdle, status, reset } = useMutation({
    mutationKey: ["createMentor"],
    mutationFn: ({ formData }) => createNewMentor({ formData }),
    onMutate: async (updatedData) => {
      console.log({ updatedData });
      console.log(variables)
      // Cancel current queries for the todos list
      await queryClient.cancelQueries({ queryKey: ['mentors'] });
      // Add optimistic todo to todos list
      const prevousMentors = queryClient.getQueryData(['mentors']);
      console.log({ prevousMentors })
      queryClient.setQueryData(['mentors'], (old) => ({
        ...old,
        pages: old?.pages?.map((page) => ({
          ...page,
          data: {
            ...page.data,
            users: page.data.users.push(updatedData),
          },
        })),
      }));
      // Return context with the optimistic todo
      return prevousMentors;
    },

    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      console.log({ err });
      console.log(context);
      // if (context?.prevousMentors) {
      queryClient.setQueryData(['mentors'], context?.prevousMentors)
      // }
    },
    onSuccess: (result, variables, context) => {
      // Boom baby!
      console.log({ result });
      console.log({ variables });
      console.log({ context })
      queryClient.setQueryData(['mentors'], (old) => ({
        ...old,
        pages: old?.pages?.map((page) => ({
          ...page,
          data: {
            ...page.data,
            users: page.data.users.push(result),
          },
        })),
      }));
    },
    retry: 3,
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ["mentors", currentPage] }),
  });
  // useEffect(() => {
  //   if (open) {
  //     queryClient.invalidateQueries({ queryKey: ["mentors"] });
  //   }
  // }, [open]);
  const createNewMentor = async ({ formData }) => {
    // const body = await request.formData();
    const { data } = await postMentor({ formData });
    console.log({ data })
    return { data, message: "success" };
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(produce((draft) => {
      const keys = name.split('.');
      if (keys.length > 1) {
        draft[keys[0]] = {
          ...draft[keys[0]], // Preserve existing properties
          [keys[1]]: value,  // Update only the specified key
        };
      } else {
        draft[name] = value;
      }
    }));

  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      mutate({ formData: formData });
    }
    setValidated(true);
  };
  console.log(formData);
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        reset(); setFormData(res);;
        // navigate(-1)
      }, 6000);
    }
  }, [isSuccess])

  return (
    <div>
      {/* <Link to={''}><span className=''>Back</span></Link> */}

      <div className="edit-content-create py-2 mx-lg-auto mb-2 bg-gray rounded shadow mt-xs-10" id='content'>
        <div className="d-flex justify-content-between align-items-center py-2">

          <h2 className="edit-title">Create Profile</h2>
          <button type='button' role='link' aria-label='Going to previous tab' className='back Button gray' onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <div
          aria-live="assertive"
          className="visually-hidden"
        >
          {!isSuccess && <div className="invalid-feedback" aria-live="assertive">Please enter a first name.</div>
          }

          {/* {open ? 'Edit dialog Opened' : 'Edit dialog Closed'} */}
          {/* {isSuccess ? "Updated Success" : ""} */}
        </div>
        <div className="edit-description" aria-label='description'>
          <p>Make changes to your profile here. Click save when you're done.</p>
        </div>
        <form className={`row g-3  needs-validation ${validated ? "was-validated" : ""}`} noValidate onSubmit={handleSubmit}>
          <div className="col-lg-4 col-md-6 col-sm-8">
            <label htmlFor="firstName" className="form-label">First name</label>
            <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <div className="invalid-feedback" aria-live="assertive">Please enter a first name.</div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-8">
            <label htmlFor="lastName" className="form-label">Last name</label>
            <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <div className="invalid-feedback" aria-live="assertive">Please enter a last name.</div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-8">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" className="form-control" id="city" name="address.city" value={formData.address.city} onChange={handleChange} required />
            <div className="invalid-feedback" aria-live="assertive">Please provide a valid city.</div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-8">
            <label htmlFor="country" className="form-label">Country</label>
            <input type="text" className="form-control" id="country" name="address.country" value={formData.address.country} onChange={handleChange} required />
            <div className="invalid-feedback" aria-live="assertive">Please provide a valid country.</div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-8">
            <label htmlFor="department" className="form-label">Department</label>
            <select
              id="department"
              name="company.department"
              className="form-select col-md-4 "
              value={formData.company.department}
              onChange={handleChange}
              required
            >
              {/* <div className="w-50"> */}

              <option value="">Choose...</option>
              <option value="Engineering">Engineering</option>
              <option value="Support">Support</option>
              <option value="Research and Development">Research and Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Product Management">Product Management</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Accounting">Accounting</option>
              <option value="Legal">Legal</option>
              <option value="Services">Services</option>
              {/* </div> */}

            </select>
            <div className="invalid-feedback" aria-live="assertive">Please select a valid department.</div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-8">
            <label htmlFor="role" className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback" aria-live="assertive">Please enter a role.</div>
          </div>

          <div className="mx-lg-auto col-lg-4 col-md-6 col-sm-8 justify-content-center">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[\d+\-\ ]{10,}"
              required
            />
            <div className="invalid-feedback" aria-live="assertive">Phone number must be 10 digits.</div>
          </div>
          <div className="row gy-2">
            <div className="col-4"></div>
            <div className="col-4 text-center">
              {isPending ? (
                <span aria-label='status' role='status' className="btn btn-primary" >Loading...</span>
              ) :
                // <button className="btn btn-primary" type="submit">Submit</button>
                isSuccess ? (
                  <span aria-live='assertive' role='status' className="btn btn-success justify-content-center">Created</span>
                ) : (
                  <button className="Button green text-center" type="submit">Submit</button>
                )
              }
            </div>
            <div className="col-4"></div>

          </div>
        </form>

        {/* <Dialog.Close asChild>
                    <button className="edit-iconButton text-center" aria-label="Close"><Cross2Icon /></button>
            </Dialog.Close> */
        }
      </div>
    </div>
  )
}

export default CreateMentor;