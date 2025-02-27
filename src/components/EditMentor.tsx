import * as React from "react";
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMentor } from "src/services/api/actionMentor";
import { produce } from 'immer'
import { useState, useEffect } from "react";

interface EditMentorProps {
  name: string;
  data: any;
  edit: boolean;
  currentPage: number;
  openCreate: boolean;
}
// const

const EditMentor = ({ name, data = {}, edit = false, currentPage }: EditMentorProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
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
    mutationKey: ["updateMentor"],
    mutationFn: ({ id, formData }) => updateMentor({ id, formData }),
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
            users: page.data.users.map((mentor) =>
              mentor.id === updatedData.id ? { ...mentor, ...updatedData.formData } : mentor
            ),
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
      if (context?.prevousMentors) {
        queryClient.setQueryData(['mentors'], context?.prevousMentors)
      } else {
        console.log(err);
      }

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
            users: page.data.users.map((mentor) =>
              mentor.id === variables.id ? { ...mentor, ...variables.formData } : mentor
            ),
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
  // useEffect(() => {
  //   setFormData(res);

  // }, [data]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      mutate({ id: formData.id, formData: formData });
    }
    setValidated(true);
  };
  console.log(formData)
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        reset(); setFormData(res); setOpen(false);
      }, 5000);
    }
  }, [isSuccess])


  return (
    <Dialog.Root open={open} onOpenChange={(state) => setOpen(state)}>
      {/* <div
        aria-live="assertive"
        className="visually-hidden"
      >
        {open ? 'Edit dialog Opened' : 'Edit dialog Closed'}
      </div> */}
      <Dialog.Trigger asChild>
        {/* <div className="visually-hidden-focusable" aria-label="assertive">
          {open ? <span> dailogue opened</span> : <span> dailogue closed</span>}
         </div> */}
        <button type="button" className="Button gray"
          aria-expanded={open}
          aria-controls="edit-content"
        // aria-label={`${open ? 'Opened' : 'Closed'} "popup-`} 
        >{name}
        </button>

      </Dialog.Trigger>

      <Dialog.Portal >
        <Dialog.Overlay className="edit-overlay" id="edit-content" />
        <Dialog.Content className="edit-content"
        // aria-labelledby="dialog-title"
        // aria-describedby="dialog-description"
        >
          <div
            aria-live="assertive"
            className="visually-hidden"
          >
            {/* {open ? 'Edit dialog Opened' : 'Edit dialog Closed'} */}
            {isSuccess ? "Updated Success" : ""}
          </div>
          {/* <div className="coantainer visually-hidden-focusable" aria-label="status"  aria-live="assertive" aria-atomic="true" >
            {isSuccess && <span> profile data updated </span>}
            {isPending && <span> profile data Pending</span>}
            {isError && <span>error in updating </span>}
          </div> */}
          {/* {
            edit &&
            <div className="container text-center position-sticky top">
              <div className="row py-2 mx-auto mb-2 bg-white rounded shadow">
                <span className="col-2">isIdle : </span>{" "}
                <span className="col-2 bg-primary text-white border rounded-2">

                  {isIdle ? "idle" : "No.."}
                </span>
                <span className="col-2">isPending : </span>{" "}
                <span className="col-2 bg-primary text-white border rounded-2">

                  {isPending ? "Pending" : "No.."}
                </span>
                <span className="col-2">isSuccess : </span>{" "}
                <span className="col-2 bg-primary text-white border rounded-2">

                  {isSuccess ? "True" : "False"}
                </span>
                <span className="col-2">Status :</span>
                <span className="col-2 bg-primary text-white border rounded-2">{status}</span>
                <span className="col-2">Error :</span>
                <span className="col-2 bg-primary text-white border rounded-2">{isError ? "Yes" : "No Error"}</span>
              </div>
            </div>
          } */}
          <Dialog.Title className="edit-title" id="dialog-title">Edit profile</Dialog.Title>
          <Dialog.Description className="edit-description" id="dialog-description">
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>

          <form className={`row g-3 justify-content-center-sm needs-validation ${validated ? "was-validated" : ""}`} noValidate onSubmit={handleSubmit}>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              <div className="invalid-feedback">Please enter a first name.</div>
            </div>

            <div className="col-lg-4 col-md-6 mx-md-auto col-sm-8">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              <div className="invalid-feedback">Please enter a last name.</div>
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
            <div className="row gy-1">
              <div className="col-4"></div>
              <div className="col-4 text-center">
                {isPending ? (
                  <button className="Button gray" type="button" disabled>Loading...</button>
                ) :
                  // <button className="btn btn-primary" type="submit">Submit</button>
                  isSuccess ? (
                    <span className="Button green justify-content-center" aria-live="assertive"
                    //  aria-live="assertive"
                    > Updated</span>
                  ) : (
                    <button className="Button green text-center" type="submit">Submit</button>
                  )
                }
              </div>
              <div className="col-4"></div>

            </div>
          </form>

          <Dialog.Close asChild>
            <button className="edit-iconButton text-center" aria-label="Close"><Cross2Icon /></button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditMentor;
