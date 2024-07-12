import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return <div>No thread found</div>;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  //   console.log(thread);
  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id?.toString() || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default Page;

// {
//   _id: new ObjectId('668cd32df79562d256710dd7'),
//   text: "In this life ain't no happy endings, only pure beginning followed by years of sinning and fake repentance.",
//   author: {
//     _id: new ObjectId('668c43b07e8770816fb20b3b'),
//     id: 'user_2ipe83ocHdJpI6PYhCRVRqOfBSx',
//     image: 'data:image/png;base64,
//     name: 'Yeabsira'
//   },
//   community: null,
//   children: [],
//   createdAt: 2024-07-09T06:05:33.272Z,
//   __v: 0
// }
