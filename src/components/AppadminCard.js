// import BASE_URL from "@/public/config";
// import { appAdminOrderUpdate } from "@/utils/api";
// import axios from "axios";
// import React, { useState } from "react";
// import { AiOutlineEdit } from "react-icons/ai";
// import "tailwindcss/tailwind.css";

// const AppadminCard = ({ data }) => {
//     const {
//         order_type,
//         awb_number,
//         status,
//         delivery_date,
//         shipment_date,
//         courier_company,
//     } = data;

//     const handleChange = () => {

//     }

//     return (
//         <tr className='bg-white dark:bg-gray-800'>
//             <th
//                 scope='row'
//                 className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
//             >
//                 {order_type}
//             </th>
//             <th
//                 scope='row'
//                 className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
//             >
//                 {awb_number}
//             </th>
//             <th
//                 scope='row'
//                 className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
//             >
//                 {shipment_date}

//             </th>
//             <th
//                 scope='row'
//                 className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
//             >
//                 {courier_company}
//             </th>
//             <th
//                 scope='row'
//                 className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
//             >
//                 {status}
//             </th>

//             <div className="modal fade" id={`exampleModal${data.awb_number}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalLabel${item._id}`} aria-hidden="true">
//                 <div className="modal-dialog" role="document">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id={`exampleModalLabel${data.awb_number}`}>{formData.projectname}</h5>
//                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                                 <span aria-hidden="true">&times;</span>
//                             </button>
//                         </div>
//                         <div className="modal-body">
//                             <div>
//                                 <input type="text" id="projectname" name="projectname" defaultValue={formData.projectname} onChange={(e) =>
//                                     setFormData({ ...formData, projectname: e.target.value })
//                                 } />
//                                 <br />
//                                 <input type="text" id="taskname" name="taskname" defaultValue={formData.taskname} onChange={(e) =>
//                                     setFormData({ ...formData, taskname: e.target.value })
//                                 } />
//                                 <br />
//                                 <textarea id="taskdescription" name="taskdescription" defaultValue={formData.taskdescription} onChange={(e) =>
//                                     setFormData({ ...formData, taskdescription: e.target.value })
//                                 }></textarea>
//                                 <br />
//                                 <textarea id="acceptancecriteria" name="acceptancecriteria" defaultValue={formData.acceptancecriteria} onChange={(e) =>
//                                     setFormData({ ...formData, acceptancecriteria: e.target.value })
//                                 }></textarea>
//                                 <br />
//                                 <input type="date" id="deadline" name="deadline" defaultValue={formData.deadline} onChange={(e) =>
//                                     setFormData({ ...formData, deadline: e.target.value })
//                                 } />
//                                 <br />
//                                 <input type="text" id="assigne" name="assigne" defaultValue={formData.assigne} onChange={(e) =>
//                                     setFormData({ ...formData, assigne: e.target.value })
//                                 } />
//                                 <br />
//                                 <button type="submit" onClick={() => updateSubmit(item._id)} data-dismiss="modal">Update Task</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </tr>

//     );
// };

// export default AppadminCard;
