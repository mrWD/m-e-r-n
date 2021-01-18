import { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';

import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';

export const DetailPage = () => {
  const [link, setLink] = useState(null);
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const { id: linkId } = useParams();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setLink(fetched);
    } catch (err) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { link && <LinkCard link={link} /> }
    </>
  );
};
