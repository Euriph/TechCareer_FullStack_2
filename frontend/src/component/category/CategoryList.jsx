//import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom'
import CategoryApi from '../../services/CategoryApi';

// FUNCTION
function CategoryList(props) {

  // REDIRECT
  let navigate = useNavigate();

  // STATE
  const [CategoryStateApi, setCategoryStateApi] = useState([]);

  // I18N
  const { t } = props;

  // USEEFFECT
  useEffect(() => {
    CategoryApi.categoryApiList()
      .then((response) => {
        console.log(response.data);
        setCategoryStateApi(response.data);
      })
      .catch((err) => { console.error(err); });

    // axios.get("http://localhost:4444/category/api/v1/list")
    //   .then((response) => {
    //     console.log(response.data);
    //     setCategoryStateApi(response.data);
    //   })
    //   .catch((err) => { console.error(err); });
  }, []);


  // LIST
  const getListCategory = (() => {
    //axios.get("http://localhost:4444/category/api/v1/list")
    CategoryApi.categoryApiList()
      .then((response) => {
        console.log(response.data);
        setCategoryStateApi(response.data);
      })
      .catch((err) => { console.error(err); });
  });

  // DELETE
  const setDeleteCategory = ((id) => {
    if (window.confirm("Silmek istediğinizden emin misiniz ?")) {
      //axios.delete("http://localhost:4444/category/api/v1/delete/" + id)
      CategoryApi.categoryApiDeleteById(id)
        .then(() => {
          getListCategory();
        })
    } else {
      alert("Silinmedi.")
    }
    navigate("/category/list");
  });

  //UPDATE
  const setUpdateCategory = (data) => {
    let { id, categoryName, systemDate } = data;
    localStorage.setItem("category_update_id", id);
    localStorage.setItem("category_update_category_name", categoryName);
    localStorage.setItem("category_update_category_date", systemDate);
  }

  //VIEW
  const setViewCategory = (id) => {
    localStorage.setItem("category_view_id", id);
  }

  // 'id': 'ID',
  // 'category_name': 'Category Name',
  // 'date': 'Date',
  // 'update': 'Update',
  // 'delete': 'Delete',
  // 'view': 'View',
  //RETURN
  return (
    <React.Fragment>
      <h1 className="text-center display-3">Category List</h1>
      <Link to="/category/create" className="btn btn-primary">Category Ekle</Link>
      <table className="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th>{props.t('id')}</th>
            <th>{t("category_name")}</th>
            <th>{t("date")}</th>
            <th>{t("update")}</th>
            <th>{t("view")}</th>
            <th>{t("delete")}</th>
          </tr>
        </thead>
        <tbody>
          {
            CategoryStateApi.map((data) =>
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.categoryName}</td>
                <td>{data.systemDate}</td>

                <td>
                  <Link to={`/category/update/${data.id}`}>
                    <i onClick={() => setUpdateCategory(data)} class="fa-solid fa-pen-to-square text-primary"></i>
                  </Link>
                </td>

                <td>
                  <Link to={`/category/view/${data.id}`}>
                    <i onClick={() => setViewCategory(data.id)} class="fa-solid fa-expand text-warning"></i>
                  </Link>
                </td>

                <td>
                  <Link to={`/category/delete}`}>
                    <i onClick={() => setDeleteCategory(data.id)} class="fa-solid fa-trash text-danger"></i>
                  </Link>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </React.Fragment>
  )
}

//i18n
export default withTranslation()(CategoryList); 