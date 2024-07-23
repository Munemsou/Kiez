const MarketCard = ({ item }) => {
  const showPriceSpaces = (num) => {
    let strNumber = num.toString();
    return strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className=" reusableBorder reusableBlur w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 flex flex-col justify-between items-center bg-blue-50 hover:bg-blue-100 transition duration-150 ease-in-out border border-blue-200 hover:border-blue-400 rounded-lg shadow-md">
      <div className="text-center">
        <p className="text-xl font-semibold mb-2 underline decoration-solid">
          Angebot: {item.title}
        </p>
        <p className="mb-4">Beschreibung: {item.description}</p>
        <img
          className="w-full h-48 object-cover rounded-md mb-4"
          src={item.image}
          alt="Produktbild"
        />
        {item.price ? (
          <p className="text-lg font-bold text-red-500">
            {showPriceSpaces(item.price)} €
          </p>
        ) : (
          <p className="text-lg font-bold text-green-500">Gratis</p>
        )}
        <div className="flex items-center justify-center mt-4">
          Kategorie:
          <span className="ml-2 px-3 py-1 border border-blue-500 text-blue-500 rounded-full bg-blue-100">
            {item.offerType}
          </span>
        </div>
        <p className="mt-4">Id des Erstellers: {item.creator}</p>
      </div>
    </div>
  );
};

export default MarketCard;
