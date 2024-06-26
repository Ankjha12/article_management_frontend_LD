import AxiosInstance from "./axios.service";

export async function GET(url: string) {
    try {  
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      return error;
    }
  }

  export async function POST(url: string, requestData?: any) {
    try {
        console.log('Checking axios instance', AxiosInstance)
      const response = await AxiosInstance.post(url, requestData);
      return response;
    } catch (error) {
      return error;
    }
  }
  
  export async function PATCH(url: string, requestData: any) {
    try {
      const response = await AxiosInstance.patch(url, requestData);
      return response;
    } catch (error) {
      return error;
    }
  }
  
  export async function DELETE(url: string, requestData?: any) {
    try {
      const response = await AxiosInstance.delete(url, requestData);
      return response;
    } catch (error) {
      return error;
    }
  }