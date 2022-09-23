import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Contact, {
    loader as contactLoader,
} from "./routes/contact";
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import EditContact, {
    action as editAction,
} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {index: true, element: <Index />},
            {
                path: "/contacts/:contactId",
                element: <Contact />,
                loader: contactLoader,
                errorElement: <div>ups that contact does not exist?</div>,
            },
            {
                path: "/contacts/:contactId/edit",
                element: <EditContact />,
                loader: contactLoader,
                action: editAction,
                errorElement: <div>ups something went wrong with editing the contact</div>
            },
            {
                path: "/contacts/:contactId/destroy",
                action: destroyAction,
                errorElement: <div>ups something went wrong with deleting the contact</div>
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
