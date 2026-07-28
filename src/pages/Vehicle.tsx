/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import { Table, Pagination, Button, Space, Select, message } from "antd";
import { useRef, useState, useEffect } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import { FormInput, FormSelect, FormCheckBox } from "../components/basic";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Action from "../store/slice/vehicle/index";
import { connect } from "react-redux";
import { format } from "date-fns";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CameraOutlined, CloudFilled } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";

interface Vehicle {
  getVehicle: (Pagination: any) => unknown;
  AddVehicle: (formData: any) => unknown;
  updateVehicle: (formData: any) => unknown;
  vehicle_Red: any;
  getCustomer: (customer: any) => unknown;
  getVehiclebyId: (id: any) => unknown;
}

interface DataSource {
  id: string;
  name: string;
  mobileNumber: string;
  dueKMs: string;
  lastVisit: string;
  lastReading: string;
  model: string;
  vehicleImageUrl: string;
  vehicleNumber: string;
}

interface FormValues {
  customerId: number;
  vehicleNumber: string;
  lastReading: string;
  lastVisit: string;
  area: string;
  sendSMS: boolean;
  model: string;
  capturedImages: {
    file: File;
    preview: string;
  }[];
}

interface FormDataTypes {
  customerId: number;
  vehicleNumber: string;
  lastReading: string;
  lastVisit: string;
  area: string;
  sendSMS: boolean;
  capturedImages: {
    file: File;
    preview: string;
  }[];
}

const validationSchema = yup.object().shape({
  customerId: yup.number().required("Customer is required"),
  vehicleNumber: yup.string().required("Car is required"),
  lastReading: yup.string().required("Reading is required"),
  lastVisit: yup.string().required("Last Visit is required"),
  model: yup.string().required("Model is required"),
  area: yup.string().required("area is required"),
  sendSMS: yup.boolean().required("Send SMS is required"),
  capturedImages: yup
    .array()
    .of(
      yup.object().shape({
        file: yup.mixed<File>().required(),
        preview: yup.string().required(),
      })
    )
    .required(),
});

interface CapturedImage {
  file: File;
  preview: string;
}
const VehiclePage: React.FC<Vehicle> = ({
  getVehicle,
  vehicle_Red,
  AddVehicle,
  getCustomer,
  getVehiclebyId,
  updateVehicle,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [tableData, setTableData] = useState<DataSource[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<DataSource[]>([]);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [search, setSearch] = useState("");
  const [customerOptions, setCustomerOptions] = useState<any[]>([]);
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [error, setError] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentCustomerId, setCurrentCustomerId] = useState<string | null>(
    null
  );

  const [formData, setFormData] = useState<FormDataTypes>({
    customerId: 0,
    vehicleNumber: "",
    lastReading: "",
    lastVisit: "",
    area: "",
    sendSMS: false,
    capturedImages: [],
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      customerId: 0,
      vehicleNumber: "",
      lastReading: "",
      lastVisit: "",
      model: "",
      area: "",
      sendSMS: false,
      capturedImages: [],
    },
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const allColumns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },

    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Due KMs",
      dataIndex: "dueKMs",
      key: "dueKMs",
    },
    {
      title: "Last Reading",
      dataIndex: "lastReading",
      key: "lastReading",
    },
    {
      title: "Last Visit",
      dataIndex: "lastVisit",
      key: "lastVisit",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Vehicle Number",
      dataIndex: "vehicleNumber",
      key: "vehicleNumber",
    },
    {
      title: "Vehicle Image",
      dataIndex: "vehicleImageUrl",
      key: "vehicleImageUrl",
      render: (base64String: string) => (
        <div className="w-20 h-20 flex items-center justify-center">
          {base64String ? (
            <img
              src={`data:image/jpeg;base64,${base64String}`}
              alt={`Vehicle`}
              style={{ width: "50%", height: "50%", borderRadius: "50%" }}
              onClick={() => setSelectedImageUrl(base64String)}
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
          {selectedImageUrl && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={() => setSelectedImageUrl(null)}
            >
              <div className="relative max-w-4xl max-h-[90vh]">
                <img
                  src={`data:image/jpeg;base64,${selectedImageUrl}`}
                  alt="Vehicle Preview"
                  className="max-w-full max-h-[80vh] rounded-lg"
                />
                <button
                  className="absolute -top-8 right-0 text-white text-lg hover:text-gray-300"
                  onClick={() => setSelectedImageUrl(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      ),
    },

    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      fixed: "right" as const,
      with: 150,

      render: (_: any, record: any) => (
        <Space size="middle">
          <FaEdit
            size={24}
            color="blue"
            style={{ cursor: "pointer" }}
            onClick={() => handleEditCustomer(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleEditCustomer = async (id: string) => {
    try {
      const response: any = await getVehiclebyId(id);
      if (response.data) {
        const data = response.data;
        const formattedLastVisit = data.lastVisit 
        ? format(new Date(data.lastVisit), 'dd-MM-yyyy') 
        : format(new Date(), 'dd-MM-yyyy');

        setValue("customerId", data.customerId);
        setValue("lastReading", data.lastReading);
        setValue("lastVisit", formattedLastVisit);
        setValue("model", data.model);
        setValue("sendSMS", data.sendSMS);
        setValue("vehicleNumber", data.vehicleNumber);

        let images: CapturedImage[] = [];
        if (data.vehicleImage) {
          const blob = await fetch(
            `data:image/jpeg;base64,${data.vehicleImage}`
          ).then((res) => res.blob());
          const file = new File([blob], "vehicle-image.jpg", {
            type: "image/jpeg",
          });
          images = [
            { file, preview: `data:image/jpeg;base64,${data.vehicleImage}` },
          ];
        }
        setValue("capturedImages", images);
        setValue("area", data.area);
        setCurrentCustomerId(id);
        setIsEditing(true);
        setShowForm(true);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      message.error("Failed to load customer data");
    }
  };

  useEffect(() => {
    getVehicle({
      pageNumber: currentPage,
      pageSize: pageSize,
      SearchText:searchTerm
    });
  }, [currentPage, pageSize,searchTerm]);

  useEffect(() => {
    getCustomer({
      pageNumber: currentPage || 1,
      pageSize: pageSize,
      search: search,
    });
  }, [currentPage, pageSize, search]);

  useEffect(() => {
    if (vehicle_Red?.data?.data) {
      const data = vehicle_Red.data.data.data;
      setTableData(data);
      setTotalRecords(vehicle_Red.data.data.totalCount);

      const filtered = data.filter((item: any) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  }, [vehicle_Red, searchTerm]);

  useEffect(() => {
    setLoadingText(true);
    setTimeout(() => {
      setLoadingText(false);
    }, 2000);
  }, []);

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
      });

      setVideoStream(stream);
      setShowCamera(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play().catch(console.error);
          }
        }, 100);
      }
    } catch (error) {
      console.error("Camera access error:", error);
      alert(`Camera access failed: ${(error as Error).message}`);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");

      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "captured-image.jpeg", {
              type: "image/jpeg",
            });
            const previewUrl = URL.createObjectURL(blob);

            // setFormData(prev => ({
            //   ...prev,
            //   capturedImages: [...prev.capturedImages, { file, preview: previewUrl }]

            // }));
            const currentImages = getValues("capturedImages") || [];
            setValue(
              "capturedImages",
              [...currentImages, { file, preview: previewUrl }],
              {
                shouldValidate: true,
              }
            );
          }
        }, "image/jpeg");
      }

      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
      setShowCamera(false);
      setVideoStream(null);
    }
  };

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play().catch(console.error);
      };
    }
  }, [videoStream]);


  const SubmitVehicle = async (data: FormValues) => {
  try {
    const dataForm = new FormData();
    setSubmitting(true);

    // Common form data setup for both create and update
    if (isEditing && currentCustomerId) {
      dataForm.append("Id", currentCustomerId);
    }
    dataForm.append("CustomerId", data.customerId.toString());
    dataForm.append("VehicleNumber", data.vehicleNumber);
    dataForm.append("LastReading", data.lastReading);
    dataForm.append("LastVisit", data.lastVisit);
    dataForm.append("Model", data.model);
    dataForm.append("Area", data.area.toString());
    dataForm.append("SendSMS", data.sendSMS.toString());
    
    // Append images
    data.capturedImages.forEach((image, index) => {
      dataForm.append(
        `VehicleImage`,
        image.file,
        `vehicle_image_${index + 1}.jpeg`
      );
    });

    // Make API call
    const result :any = isEditing && currentCustomerId 
      ? await updateVehicle(dataForm) 
      : await AddVehicle(dataForm);

    if (result?.code === 200) {
      reset();
      setTimeout(() => {
        setShowForm(false);
        getVehicle({
          pageNumber: currentPage,
          pageSize: pageSize,
        });
      }, 2000);
      message.success(`Vehicle ${isEditing ? 'updated' : 'added'} successfully`);
    } else {
      message.error(result?.message || `Failed to ${isEditing ? 'update' : 'add'} vehicle`);
    }
  } catch (error: any) {
    const apiError = error?.response?.data;

    if (apiError?.errors) {
      message.error("Please fix the form errors");
      return;
    }

    const errorMessage = apiError?.message || error.message || 
      `Failed to ${isEditing ? 'update' : 'add'} vehicle`;
    message.error(errorMessage);
  } finally {
    setSubmitting(false);
  }
};

  useEffect(() => {
    if (vehicle_Red.cusData?.data?.data) {
      const newOptions = vehicle_Red.cusData.data.data.map((item: any) => ({
        label: item.displayText,
        value: item.id,
      }));
      if (currentPage === 1) {
        setCustomerOptions(newOptions);
      } else {
        setCustomerOptions((prev) => [...prev, ...newOptions]);
      }
    }
  }, [vehicle_Red.cusData]);

  useEffect(() => {
    setIsCustomerLoading(vehicle_Red.loading);
  }, [vehicle_Red.loading]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target) {
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) <= 10; // 10px from bottom

      if (isNearBottom) {
        const total = vehicle_Red.cusData?.data?.totalCount || 0;
        const totalPages = Math.ceil(total / pageSize);
        if (currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      }
    }
  };

  useEffect(() => {
    if (showForm) {
      const currentDate = format(new Date(), "yyyy-MM-dd");
      setValue("lastVisit", currentDate);
    }
  }, [showForm, setValue]);

  return (
    <Layout>
      {showForm ? (
        <form
          action=""
          className="mt-5 w-100    p-1"
          onSubmit={handleSubmit(SubmitVehicle)}
        >
          <div className="flex items-center justify-between">
            <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
              Add Vehicle
            </p>
            
          </div>

          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Customer
            </p>
            <FormSelect
              Label=""
              placeholder="Customer"
              name="customerId"
              className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
              labelClass="text-[16px] font-bold color-light"
              options={customerOptions}
              onSearch={handleSearch}
              onPopupScroll={handlePopupScroll}
              filterOption={false}
              showSearch
              loading={isCustomerLoading}
              onChange={(value: any) => setValue("customerId", value)}
              errors={errors}
              control={control}
              autoFocus
            />
          </div>

          <div className="flex items-center gap-x-4 mt-5 w-100">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Last Visit
            </p>
            <FormInput
              Label=""
              placeholder="Last Visit"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="lastVisit"
              type="date"
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 w-100">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Vehicle Number
            </p>
            <FormInput
              Label=""
              placeholder="Vehicle Number"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="vehicleNumber"
              type="vehicleNumber"
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 w-100">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Last Reading
            </p>
            <FormInput
              Label=""
              placeholder="Last Reading"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="lastReading"
              type="lastReading"
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 w-100">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Model
            </p>
            <FormInput
              Label=""
              placeholder="Model"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="model"
              type="model"
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 w-100">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Area
            </p>
            <FormInput
              Label=""
              placeholder="Enter Your Area"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="area"
              type="area"
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 w-100">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Send SMS
            </p>
            <FormCheckBox
              Label=""
              placeholder="Last Reading"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="sendSMS"
              // type="sendSMS"
              errors={errors}
              control={control}
            />
          </div>

          <div className="flex items-center gap-x-4 mt-5">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Capture Image
            </p>

            <div className="flex flex-row gap-2 items-center">
              {showCamera && (
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-64 h-48 border rounded-lg bg-black"
                    style={{ transform: "scaleX(-1)" }}
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        videoRef.current.play().catch((error) => {
                          console.error("Error playing video:", error);
                        });
                      }
                    }}
                  />
                  <Button
                    onClick={captureImage}
                    className="mt-2 absolute bottom-2 left-1/2 transform -translate-x-1/2"
                    icon={<CameraOutlined />}
                  >
                    Capture
                  </Button>
                </div>
              )}
              {!showCamera && (
                <Button onClick={handleOpenCamera} icon={<CameraOutlined />}>
                  Open Camera
                </Button>
              )}

              {Array.isArray(watch("capturedImages")) &&
                watch("capturedImages")?.map((image, index) => (
                  
                  <div key={`capture-${index}`} className="relative group">
                    <img
                      src={image.preview}
                      alt={`Capture ${index + 1}`}
                      className="h-32 w-full object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newCaptures = [
                          ...(watch("capturedImages") || []),
                        ];
                        newCaptures.splice(index, 1);
                        setValue("capturedImages", newCaptures);
                      }}
                      className="absolute top-1 w-6 h-6 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <span className="text-xs">Capture {index + 1}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-4 bg-primary rounded-[10px] p-4 cursor-pointer py-3 px-4"
              >
                <img src={arrowIcon} alt="arrowIcon-Icon" />
                <span className="text-[16px] text-white">Back</span>
              </button>
              <button
                className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer"
                type="submit"
                disabled={submitting}
              >
                <img src={saveIcon} alt="save-Icon" />
                <span className="text-[16px] text-white">
                  {submitting ? "Saving..." : "Save"}
                </span>
              </button>
            </div>
        </form>
      ) : (
        <div>
          <LayoutHeader
            titleName={"Vehicles"}
            onAddNew={() => setShowForm(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Table
            className="custom-table"
            loading={vehicle_Red.loading}
            columns={allColumns}
            dataSource={filteredData}
            pagination={false}
            size="small"
            // rowKey="id"
            rowClassName="hover:bg-gray-50 transition-colors"
            scroll={{ x: true }}
          />

          <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="text-gray-500">
              Showing {currentPage * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords}{" "}
              entries
            </div>

            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalRecords}
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }}
              itemRender={(current, type, originalElement) => {
                if (type === "prev")
                  return (
                    <Button
                      icon={<MdOutlineKeyboardArrowLeft />}
                      className="flex items-center"
                    />
                  );
                if (type === "next")
                  return (
                    <Button
                      icon={<MdKeyboardArrowRight />}
                      className="flex items-center"
                    />
                  );
                if (type === "page")
                  return <Button className="mx-1">{current}</Button>;
                return originalElement;
              }}
              showSizeChanger
              pageSizeOptions={["9", "15", "30", "50"]}
              className="space-x-2"
            />
          </div>
        </div>
      )}
    </Layout>
  );
};
function mapStateToProps(state: any) {
  return {
    vehicle_Red: state.vehicle_Red,
  };
}

export default connect(mapStateToProps, Action)(VehiclePage);
