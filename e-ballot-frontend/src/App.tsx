import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { ColorModeSwitcher } from "./Components/Dashboard/ColorModeSwitcher"
import {Dashboard} from "./Components/Dashboard/Dashboard";
import {Home} from "./Components/Home/Home";
import {NotFound} from "./Components/Other/NotFound";
import {UsersTable} from "./Components/Users/UsersTable";
import {UserDashboard} from "./Components/Users/UserDashboard";

function NavigateFunctionComponent() {
    return null;
}

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
           {<NavigateFunctionComponent />}
            <Routes>

                <Route path="/" element={<Dashboard></Dashboard>}>
                    <Route path="/home" element={<Home></Home>}/>
                    <Route path="/citizens" element={<UsersTable></UsersTable>}/>
                        <Route path="/citizens/:user_id" element={<UserDashboard></UserDashboard>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
  </ChakraProvider>
)
