export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col py-2">
      <h2>Profile</h2>
      <hr />
      <p>
        Profile page{" "}
        <span className="p-2 rounded bg-orange-500 text-white ml-2">
          {params.id}
        </span>
      </p>
    </div>
  );
}
