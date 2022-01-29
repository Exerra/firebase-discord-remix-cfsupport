import { config } from "~/info.js"
import {Link} from "@remix-run/react";

let clientID = ""
let redirect = ""

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>test page</h1>
        <Link to={"/login"}>login</Link>
    </div>
  );
}
