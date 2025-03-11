import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sitemap.scss'

const Sitemap = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Sitemap</h1>
      <ul className="list-unstyled">
        {/* Dashboard */}
        <p className="d-inline-flex gap-1">
  <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Link with href
  </a>
  <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Button with data-bs-target
  </button>
</p>
<div className="collapse" id="collapseExample">
  <div className="card card-body">
    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
  </div>
</div>
        <a href="#" className="text-decoration-none text-primary">
            Dashboard
          </a>
        <li>
          <div className="vr">
            <div className="d-flex ms-4 conatainer-fluid jsutify-content-start">
         
            <ul className="list-unstyled ms-4 ">
            <li>
              <a href="#" className="text-decoration-none text-primary">
                Past Due preferences (overlay)
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-primary">
                Integrity Violations (overlay)
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-secondary">
                Upcoming assignments report
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-secondary">
                Credential issuance report
              </a>
            </li>
          </ul>

            </div>


          </div>

         
        </li>

        {/* Grades */}
        <li>
          <a href="#" className="text-decoration-none text-primary">
            Grades
          </a>
          <ul className="list-unstyled ms-4">
            <li>
              <a href="#" className="text-decoration-none text-secondary">
                Gradebook
              </a>
              <ul className="list-unstyled ms-4">
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    Learner panel (overlay)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    Assignment panel (overlay)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    Grade panel (overlay)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    Settings...
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-secondary">
                Resource Submissions
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-secondary">
                Reports
              </a>
              <ul className="list-unstyled ms-4">
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    Create
                  </a>
                  <ul className="list-unstyled ms-4">
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Course Overview
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        ...
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Courses */}
        <li>
          <a href="#" className="text-decoration-none text-primary">
            Courses
          </a>
          <ul className="list-unstyled ms-4">
            <li>
              <a href="#" className="text-decoration-none text-secondary">
                View all
              </a>
              <ul className="list-unstyled ms-4">
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    Actions
                  </a>
                  <ul className="list-unstyled ms-4">
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Snapshot
                      </a>
                      <ul className="list-unstyled ms-4">
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Instructors
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Students
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Assignments
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Credentials
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Print Snapshot
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Edit/assign
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Remove pairing (action)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Overview report
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Organizer
                      </a>
                      <ul className="list-unstyled ms-4">
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Global settings (overlay)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Group settings (overlay)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Assignment settings (overlay)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Batch operations (overlay)
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Gradebook
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Import new learners
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Import existing learners
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Export roster
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Export assignments
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Send message
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        SIMstudent
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Delete
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-secondary">
                Create
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-secondary">
                Organize
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-secondary">
                Import
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-secondary">
                Archive
              </a>
            </li>
          </ul>
        </li>

        {/* Users */}
        <li>
          <a href="#" className="text-decoration-none text-primary">
            Users
          </a>
          <ul className="list-unstyled ms-4">
            <li>
              <a href="#" className="text-decoration-none text-secondary">
                Instructors
              </a>
              <ul className="list-unstyled ms-4">
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    View all
                  </a>
                  <ul className="list-unstyled ms-4">
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Actions
                      </a>
                      <ul className="list-unstyled ms-4">
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Snapshot
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Print snapshot
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Edit/assign
                          </a>
                          <ul className="list-unstyled ms-4">
                            <li>
                              <a href="#" className="text-decoration-none text-secondary">
                                Details
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-decoration-none text-secondary">
                                Courses
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Remove pairing
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Send message
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            View history
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Delete
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    Create
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    Import
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-secondary">
                Learners
              </a>
              <ul className="list-unstyled ms-4">
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    View all
                  </a>
                  <ul className="list-unstyled ms-4">
                    <li>
                      <a href="#" className="text-decoration-none text-secondary">
                        Actions
                      </a>
                      <ul className="list-unstyled ms-4">
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Snapshot
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Print snapshot
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Edit/assign
                          </a>
                          <ul className="list-unstyled ms-4">
                            <li>
                              <a href="#" className="text-decoration-none text-secondary">
                                Details
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-decoration-none text-secondary">
                                Courses
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-decoration-none text-secondary">
                                Licenses
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-decoration-none text-secondary">
                                "Time on task"
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-decoration-none text-secondary">
                                Personal assignments
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-decoration-none text-secondary">
                                Credentials
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Remove pairing
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Send message
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            View history
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-decoration-none text-secondary">
                            Delete
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    Create
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    Import
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-secondary">
                    Archive
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sitemap;