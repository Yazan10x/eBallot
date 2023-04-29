from Models.Voting import Voting

def create_user(first_name: str, last_name: str, dob: datetime, email: str, government_id_image: Binary, portrait_image: Binary):
    profile = User.Profile(first_name, last_name)
    user = User(ObjectId("644ca69febcdc710c51d0b3d"), profile)
    E_BALLOT_DB.users_coll.insert_one(user.to_json())


if __name__ == '__main__':
    voting = Voting()

    create_user("Yazan", "Armoush", 19, gov_id_image, port_image)

    profile = User.Profile("Yazan", "Armoush")
    user = User(ObjectId("644ca69febcdc710c51d0b3d"), profile)

    voting.vote(user, "Liberal")
    print(voting.votedUsers[user] == "Liberal")


