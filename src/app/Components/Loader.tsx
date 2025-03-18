"use client";
import { useLoading } from "@/context/LoadingContext";
import { useEffect } from "react";

const PizzaLoader = () => {
  const { isPageLoading, setIsPageLoading } = useLoading();

  useEffect(() => {
    setIsPageLoading(true);
    const timeout = setTimeout(() => {
      setIsPageLoading(false);
    }, 3000); // Max 3 sekunder loader

    return () => clearTimeout(timeout);
  }, [setIsPageLoading]);

  if (!isPageLoading) return null;

  return (
    <div 
    className="fixed inset-0 flex justify-center items-center bg-[#FBF6E9] z-50"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <div className="flex flex-row items-center">
      <svg 
        role="img" 
        aria-labelledby="svgTitle"
        width="300"
        height="300"
        viewBox="0 0 470 470"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#000"
        strokeWidth="5"
        fill="none"
        className="animate-spin-slow"
      >
          <title id="svgTitle">En snurrande pizza som indikerar laddning</title>
          <g>
            <path d="M146.378,62.473c0.078,0.16,0.154,0.321,0.244,0.477c0.094,0.162,0.198,0.314,0.301,0.467l81.582,141.318   c1.34,2.321,3.816,3.75,6.495,3.75c2.68,0,5.156-1.429,6.496-3.75L338.23,37.206c2.071-3.587,0.842-8.174-2.745-10.246   C304.94,9.323,270.255,0,235.181,0c-35.28,0-70.088,9.309-100.66,26.919c-1.725,0.994-2.984,2.632-3.5,4.554   s-0.247,3.971,0.748,5.694L146.378,62.473z M235,185.986L163.495,62.122c44.787-22.982,98.307-22.972,143.011,0.028L235,185.986z    M235.181,15c29.956,0,59.612,7.355,86.234,21.331l-7.399,12.815c-49.343-25.652-108.602-25.663-158.029-0.029l-7.398-12.815   C175.252,22.345,205.03,15,235.181,15z"/>
            <circle cx="235" cy="131.926" r="7.499"/>
            <path d="m259.904,79.314c-1.782-6.652-6.048-12.212-12.012-15.656-3.917-2.262-8.37-3.458-12.875-3.458-9.191,0-17.753,4.94-22.345,12.893-3.444,5.964-4.359,12.912-2.577,19.564 1.782,6.652 6.048,12.212 12.012,15.656 3.917,2.262 8.37,3.458 12.875,3.458 9.191,0 17.753-4.94 22.345-12.893 3.444-5.963 4.36-12.911 2.577-19.564zm-15.567,12.064c-1.921,3.327-5.505,5.394-9.355,5.394-1.875,0-3.734-0.5-5.374-1.448-2.494-1.44-4.278-3.766-5.024-6.547-0.745-2.782-0.362-5.688 1.078-8.182 1.921-3.327 5.505-5.394 9.355-5.394 1.875,0 3.734,0.5 5.374,1.448 2.494,1.44 4.278,3.766 5.024,6.547 0.746,2.782 0.363,5.687-1.078,8.182z"/>
            <path d="m12.057,225.484l29.213,.001c0.18,0.013 0.359,0.028 0.542,0.028 0.193,0 0.376-0.015 0.559-0.028l163.172,.008c2.68,0 5.156-1.429 6.496-3.75 1.34-2.321 1.34-5.18 0-7.5l-96.719-167.54c-0.995-1.723-2.633-2.98-4.554-3.495-1.92-0.515-3.968-0.246-5.691,0.749-31.091,17.948-56.815,43.864-74.391,74.945-17.059,30.166-26.093,64.425-26.127,99.075-0.002,1.99 0.787,3.9 2.194,5.308 1.407,1.407 3.315,2.199 5.306,2.199zm94.098-164.654l7.396,12.811c-12.323,7.861-23.605,17.281-33.594,28.103-2.809,3.043-2.62,7.789 0.424,10.598 1.442,1.331 3.266,1.989 5.085,1.989 2.021,0 4.035-0.812 5.513-2.413 8.961-9.707 19.064-18.171 30.082-25.267l71.492,123.843-143.021-.007c1.326-26.819 9.551-52.894 24.026-75.837 2.21-3.503 1.163-8.135-2.341-10.345-3.505-2.211-8.135-1.162-10.345,2.341-15.99,25.343-25.023,54.184-26.359,83.84l-14.795-.001c2.533-60.88 35.008-117.106 86.437-149.655z"/>
            <circle cx="72.762" cy="191.213" r="7.499"/>
            <circle cx="138.265" cy="190.213" r="7.499"/>
            <path d="m130.445,397.065l81.593-141.308c1.34-2.321 1.34-5.18 0-7.5-1.339-2.321-3.815-3.75-6.495-3.75l-193.453-.009c-1.989,0-3.897,0.79-5.304,2.196-1.406,1.407-2.197,3.314-2.197,5.303-0.001,35.9 9.58,71.135 27.709,101.897 17.595,29.856 42.747,54.81 72.738,72.164 1.152,0.666 2.449,1.008 3.756,1.008 0.649,0 1.3-0.084 1.938-0.254 1.923-0.514 3.563-1.771 4.558-3.495l14.677-25.419c0.074-0.113 0.157-0.217 0.226-0.336 0.094-0.163 0.174-0.33 0.254-0.497zm-9.409-13.701c-42.296-27.295-69.048-73.65-71.481-123.865l142.998,.007-71.517,123.858zm-14.909,25.819c-51.456-32.634-83.912-88.871-86.386-149.685l14.796,.001c2.456,55.557 32.076,106.883 78.989,136.87l-7.399,12.814z"/>
            <circle cx="149.765" cy="295.76" r="7.5"/>
            <path d="m323.622,407.527c-0.078-0.16-0.154-0.321-0.244-0.477-0.094-0.163-0.198-0.315-0.302-0.468l-81.581-141.317c-1.34-2.321-3.816-3.75-6.495-3.75-2.68,0-5.156,1.429-6.496,3.75l-96.734,167.529c-2.071,3.587-0.842,8.174 2.745,10.246 30.543,17.636 65.228,26.958 100.305,26.96 35.282,0 70.089-9.309 100.66-26.919 1.725-0.994 2.984-2.632 3.5-4.554s0.247-3.971-0.748-5.694l-14.61-25.306zm-88.794,47.473c-29.966-0.001-59.622-7.356-86.242-21.331l7.395-12.807c19.691,10.256 40.963,16.494 63.352,18.536 0.231,0.021 0.462,0.031 0.69,0.031 3.834,0 7.105-2.926 7.46-6.819 0.376-4.125-2.663-7.774-6.788-8.15-20.208-1.843-39.415-7.425-57.208-16.597l71.513-123.849 71.513,123.877c-17.802,9.152-36.999,14.725-57.182,16.569-4.125,0.376-7.164,4.026-6.787,8.151 0.355,3.893 3.625,6.818 7.46,6.818 0.229,0 0.459-0.01 0.691-0.032 22.362-2.042 43.624-8.27 63.323-18.505l7.393,12.807c-26.663,13.956-56.437,21.301-86.583,21.301z"/>
            <circle cx="230.5" cy="330.574" r="7.499"/>
            <path d="m463.249,246.715c-1.407-1.408-3.315-2.199-5.306-2.199l-29.213-.001c-0.18-0.013-0.359-0.028-0.542-0.028-0.193,0-0.376,0.015-0.559,0.028l-163.172-.008c-2.68,0-5.156,1.429-6.496,3.75-1.34,2.321-1.34,5.18 0,7.5l96.718,167.541c0.995,1.723 2.633,2.98 4.554,3.495 0.639,0.171 1.291,0.256 1.941,0.256 1.305,0 2.6-0.341 3.75-1.004 31.091-17.949 56.815-43.864 74.391-74.945 17.059-30.166 26.093-64.425 26.127-99.075 0.003-1.992-0.786-3.901-2.193-5.31zm-99.404,162.455l-7.391-12.803c29.306-18.724 52.616-46.459 66.074-78.821 1.591-3.825-0.22-8.214-4.045-9.805-3.824-1.59-8.214,0.221-9.805,4.045-12.2,29.335-33.26,54.497-59.734,71.573l-71.498-123.853 143.033,.007c-0.42,8.335-1.512,16.688-3.277,24.92-0.868,4.05 1.711,8.037 5.762,8.905 0.53,0.113 1.059,0.168 1.579,0.168 3.461,0 6.572-2.409 7.326-5.93 1.986-9.266 3.19-18.675 3.621-28.063l14.792,.001c-2.533,60.881-35.008,117.107-86.437,149.656z"/>
            <circle cx="318.687" cy="284.374" r="7.499"/>
            <circle cx="354.096" cy="353.074" r="7.499"/>
            <circle cx="354.096" cy="116.307" r="7.5"/>
            <path d="m339.555,72.935l-81.593,141.308c-1.34,2.321-1.34,5.18 0,7.5 1.339,2.321 3.815,3.75 6.495,3.75l193.454,.009c1.989,0 3.897-0.79 5.304-2.196 1.406-1.407 2.197-3.314 2.197-5.303 0.001-35.9-9.58-71.135-27.709-101.897-17.595-29.856-42.747-54.81-72.738-72.164-1.724-0.997-3.773-1.267-5.694-0.754-1.923,0.514-3.563,1.771-4.558,3.495l-14.61,25.302c-0.1,0.148-0.202,0.295-0.293,0.452-0.095,0.164-0.175,0.331-0.255,0.498zm9.409,13.701c42.296,27.295 69.048,73.65 71.481,123.865l-142.998-.007 71.517-123.858zm14.909-25.819c51.456,32.634 83.912,88.871 86.386,149.685l-14.796-.001c-2.456-55.557-32.076-106.883-78.989-136.87l7.399-12.814z"/>
            <path d="m105.968,186.278c4.504,0 8.956-1.195 12.873-3.457 5.964-3.443 10.23-9.002 12.013-15.655 1.783-6.652 0.868-13.6-2.575-19.564-4.592-7.954-13.154-12.896-22.346-12.896-4.504,0-8.956,1.195-12.873,3.457-5.964,3.443-10.231,9.002-12.014,15.655-1.783,6.652-0.868,13.6 2.575,19.564 4.592,7.955 13.155,12.896 22.347,12.896zm-10.433-28.576c0.746-2.782 2.53-5.107 5.024-6.547 1.64-0.947 3.499-1.447 5.374-1.447 3.85,0 7.435,2.067 9.355,5.395 1.44,2.494 1.822,5.4 1.077,8.182-0.746,2.782-2.53,5.107-5.024,6.547-1.64,0.947-3.499,1.447-5.374,1.447-3.85,0-7.435-2.067-9.356-5.395-1.439-2.495-1.821-5.401-1.076-8.182z"/>
            <path d="m87.718,327.737c4.87,4.87 11.344,7.552 18.231,7.553 14.216,0 25.782-11.565 25.783-25.781 0-6.887-2.681-13.361-7.55-18.231-4.87-4.87-11.344-7.552-18.232-7.552-14.216,0-25.782,11.565-25.782,25.781-0.001,6.886 2.681,13.36 7.55,18.23zm18.233-29.012c2.88,0 5.588,1.122 7.625,3.158 2.036,2.037 3.158,4.744 3.157,7.625 0,5.945-4.837,10.782-10.782,10.782l-.001,7.5v-7.5c-2.88,0-5.588-1.122-7.624-3.159-2.037-2.037-3.158-4.745-3.158-7.625 1.42109e-14-5.945 4.837-10.781 10.783-10.781z"/>
            <path d="m257.328,396.906c3.444-5.964 4.359-12.912 2.577-19.564-1.782-6.652-6.048-12.212-12.012-15.656-3.917-2.262-8.37-3.458-12.875-3.458-9.191,0-17.753,4.94-22.345,12.893-3.444,5.963-4.359,12.912-2.577,19.564 1.782,6.652 6.048,12.212 12.012,15.656 3.917,2.262 8.37,3.458 12.875,3.458 9.19-5.68434e-14 17.752-4.94 22.345-12.893zm-12.991-7.5c-1.921,3.327-5.505,5.394-9.355,5.394-1.875,0-3.734-0.5-5.374-1.448-2.494-1.44-4.278-3.766-5.024-6.547-0.745-2.782-0.362-5.688 1.078-8.182 1.921-3.327 5.505-5.394 9.355-5.394 1.875,0 3.734,0.5 5.374,1.448 2.494,1.44 4.278,3.766 5.024,6.547 0.746,2.781 0.363,5.687-1.078,8.182z"/>
            <path d="m364.032,283.722c-4.504,0-8.956,1.195-12.873,3.457-5.964,3.443-10.23,9.002-12.013,15.655-1.783,6.652-0.868,13.6 2.575,19.564 4.592,7.954 13.154,12.896 22.346,12.896 4.504,0 8.956-1.195 12.873-3.457 5.964-3.443 10.231-9.002 12.014-15.655 1.783-6.652 0.868-13.6-2.575-19.564-4.592-7.955-13.155-12.896-22.347-12.896zm10.433,28.576c-0.746,2.782-2.53,5.107-5.024,6.547-1.64,0.947-3.499,1.447-5.374,1.447-3.85,0-7.435-2.067-9.355-5.395-1.44-2.494-1.822-5.4-1.077-8.182 0.746-2.782 2.53-5.107 5.024-6.547 1.64-0.947 3.499-1.447 5.374-1.447 3.85,0 7.435,2.067 9.356,5.395 1.439,2.495 1.821,5.401 1.076,8.182z"/>
            <path d="m382.282,142.263c-4.87-4.87-11.344-7.552-18.232-7.553-14.216,0-25.782,11.565-25.782,25.781 0,6.887 2.681,13.361 7.55,18.231 4.87,4.87 11.344,7.552 18.231,7.552 14.216,0 25.782-11.565 25.783-25.781 0.001-6.886-2.681-13.36-7.55-18.23zm-18.232,29.012l-.001,7.5 .001-7.5c-2.881,0-5.588-1.122-7.625-3.158-2.036-2.037-3.158-4.744-3.157-7.625 0-5.945 4.837-10.782 10.783-10.782 2.88,0 5.588,1.122 7.624,3.159 2.037,2.037 3.158,4.745 3.158,7.625-0.001,5.945-4.838,10.781-10.783,10.781z"/>
            </g>
        </svg>

        <p className="text-3xl font-bold text-gray-700 ml-6">Loading...</p>
      </div>

      <style jsx global>{`
    /* @keyframes slowSpin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    } */
  `}</style>
    </div>
  );
};

export default PizzaLoader;