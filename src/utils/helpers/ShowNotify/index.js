import swal from "sweetalert";

const icon = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

export const ShowNotify = (
  title = "Success",
  text = "Successful",
  iconType = "success",
  button = "Ok",
  timer = 2000
) => {
  return swal({
    title,
    text,
    icon: icon[iconType],
    buttons: button,
    timer,
  });
};
export const ShowNotify1 = (
  title = "Bạn đã hết lượt quay",
  text = "Successful",
  iconType = "success",
  button = "Ok",
  timer = 2000
) => {
  return swal({
    title: "<i>Title</i>",
    text,
    icon: icon[iconType],
    buttons: button,
    timer,
  });
};

export const HandleNotify = async (
  title = "Success",
  text = "Successful",
  iconType = "success",
  button = false,
  dangerMode = false,
  successFunc,
  errorFunc
) => {
  return swal({
    title,
    text,
    icon: icon[iconType],
    buttons: button,
    dangerMode,
  })
    .then((willDelete) => {
      if (willDelete) {
        successFunc();
      } else {
        !errorFunc ? swal.close() : errorFunc();
      }
    })
    .catch((e) => {
      //do something
    });
};
