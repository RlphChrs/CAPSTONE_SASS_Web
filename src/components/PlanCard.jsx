const PlanCard = ({ plan, isLastItem }) => {
  // you can design here if a premium lain color, sample implementation below (if based on amount)
  // description will be automatically added depende sa kadaghanon sa inyong gibutang

  // COMMENT
  // butangi og bullet point ang description para nindot tan awon,
  // check the color it is green, line 23 is responsible for that, you can change it to any color you want
  // or you can change it to an icon
  return (
    <div
      className={`${
        isLastItem ? "bg-orange-500" : "bg-black text-white"
      }  p-7 rounded-lg shadow-xl min-h-[300px] flex flex-col`}
    >
      <h3 className="text-xl font-semibold mb-2">{plan.planName}</h3>
      <p className="text-4xl font-bold mb-4">
        {plan.currency === "PHP" ? "₱" : "$"}
        {plan.price}
      </p>
      <ul className="text-left space-y-2">
        {plan?.description?.split("\n").map((desc) => {
          return (
            <li key={desc} className="flex gap-2 items-center">
              <div className="aspect-square w-2 rounded-full bg-green-500"></div>
              <span>{desc}</span>
            </li>
          );
        })}
      </ul>
      <button className="block mt-auto self-center px-4 py-2 bg-teal-500 text-white rounded-md">
        Choose Plan
      </button>
    </div>
  );
};

export default PlanCard;
