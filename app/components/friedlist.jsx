import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"


const FriendList = () => {
  return ( 
    <div className="flex justify-start items-center  border-none border-white hover:bg-[#181414]">
      <div className="flex h-full ml-[0.6vw] p-[4px]">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex mt-auto justify-end">
          <div className="h-[0.9vh] w-[0.9vh] mx-auto rounded-full bg-green-500 relative right-[0.80vw] justify-end">
          </div>
        </div>
      </div>
      <div className="pl-[0.6vw]">
        <p>Placeholder</p>
      </div>
      <div>
        <br />
      </div>
    </div>

  );
}

export default FriendList;