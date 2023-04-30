import * as React from "react"
import {
    Box,
    VStack, Grid, GridItem, SimpleGrid, Text, Stack, Skeleton, Heading, Spacer, Center, Badge, HStack, WrapItem, Avatar
} from "@chakra-ui/react"

import {UsersAPI} from "../../APIs/UsersAPI"
import {Component, memo, useEffect, useState} from "react";
import {Profile, User} from "../../Models/User";
import {TableFunction} from "../Table/Table";

interface TableData {
    profile: Profile
    full_name: string
    username: string
    email: string
    position: string
    link: string
}

export const UsersTable = React.memo(() =>  {
    const [users, set_users] = useState<Array<TableData> | undefined>();

    const display_users = () => {
        UsersAPI.get_users()
            .then((res) => {
                let data = res!
                let entry = data.map((user) => {
                    return {
                        profile: user.profile,
                        full_name: user.profile.first_name + " " + user.profile.last_name,
                        username: user.profile.first_name,
                        email: user.profile.email,
                        position: user.profile.first_name,
                        link: window.location.pathname + user._id.toString()
                    }
                })
                set_users([])
                set_users(entry)
                console.log(entry)
            })
    }

    useEffect(() => {
        display_users()
    }, []);

    const get_columns = () => {

        return [
            {
                Header: "",
                accessor: "profile",
                Cell: function StatusCell(profile: Profile) {
                    return (
                        <WrapItem>
                            <Avatar name={profile.first_name} src={profile.first_name} />
                        </WrapItem>
                    )
                },
            },
            {
                Header: "Name",
                accessor: "full_name",
            },
            {
                Header: "Username",
                accessor: "username",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Position",
                accessor: "position",
            },
        ]
    }

    return(
        <Box overflowX="auto" overflowY="hidden">
            <Center>
                <VStack>
                     <Heading
                        fontWeight={600}
                        fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                        lineHeight={"100%"}
                      >
                        Voters

                         </Heading>
                    <Heading fontWeight={600}
                        fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                                 color={"red.400"}>
                          Page
                        </Heading>
                </VStack>

            </Center>
            <Spacer></Spacer>
            <Box>
                {users ?
                    <TableFunction data={users} columns={get_columns()} hover_color='red.400'/>
                :
                    <Stack>
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                    </Stack>
            }
            </Box>
       </Box>)
})
