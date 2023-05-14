"use client";

import { isValidJwt } from "../utils/validations";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import ErrorPage from "next/error";

import dynamic from "next/dynamic";
const Leaflet = dynamic(() => import("../components/LeafletMap/LeafletMap"), {
  ssr: false,
});

export default function Page({ searchParams }) {
  const info = searchParams.info;

  if (info) {
    if (isValidJwt(info)) {
      const jsonArray = jwt_decode(info);
      return (
        <>
          <main className="flex min-h-screen flex-col align-items-center h-100 gap-6 px-3 bg-gradient-to-r from-cyan-200 to-blue-200 relative">
            <div className="z-500 absolute bottom-10 left-10">
              <Link
                className="bg-sky-500 text-white px-10 py-3 rounded-md w-full"
                href={"/"}
              >
                Επιστροφή στην αρχική
              </Link>
            </div>
            <div className="p-4 w-full h-screen rounded-xl">
              <Leaflet points={jsonArray} />
            </div>
          </main>
        </>
      );
    } else {
      return <ErrorPage statusCode={403} title={"Forbidden. Not valid token"}/>;
    }
  } else {
    return <ErrorPage statusCode={403} title={"Forbidden.Map page must have info token"} />;
  }
}
