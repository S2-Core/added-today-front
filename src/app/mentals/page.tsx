"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useMentals } from "@/contexts";

import Container from "@/components/container";
import Card from "@/components/card";
import Tabs, { Tab } from "@/components/tabs";
import Loading from "@/components/loading";
import EmptyList from "@/components/emptyList";
import Register from "@/components/register";

import createMentalSchema from "@/validators/mentals/create.validator";

import { createInputs, createSelects } from "@/constants/mentals";

import { fileToBase64 } from "@/utils/image.utils";

import { ICreateMental } from "@/contexts/mentals/interfaces";

const Mentals = () => {
  const {
    mentalsToManage,
    handleDeactivateMental,
    tab,
    setTab,
    handleCreateMental,
    handleRestoreMental,
  } = useMentals();

  const createForm = useForm<ICreateMental>({
    mode: "onChange",
    resolver: yupResolver(createMentalSchema),
  });

  const handleCreate = async ({
    imageUrl: imagesUrl,
    ...data
  }: ICreateMental) => {
    const imageUrl = imagesUrl?.[0] || null;

    (data as ICreateMental).imageUrl = imageUrl
      ? await fileToBase64(imageUrl as File)
      : imageUrl;

    await handleCreateMental(data as ICreateMental).finally(() =>
      createForm.reset()
    );
  };

  return (
    <Container Tag={"main"}>
      <Tabs setTab={setTab} tab={tab} id="mentals">
        <Tab label="Gerenciar Mentals" name="manageMentals">
          {mentalsToManage ? (
            !!mentalsToManage.length ? (
              <ul className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 xl:grid-cols-4">
                {mentalsToManage.map(
                  ({
                    id,
                    slug,
                    imageUrl,
                    properties,
                    title,
                    isActive,
                    status,
                  }) => (
                    <Card
                      key={`${title}-${id}`}
                      id={id}
                      image={imageUrl}
                      defaultImage="/images/defaults/mentals.png"
                      properties={properties}
                      title={title}
                      link={`/mentals/${slug}`}
                      isActive={isActive}
                      deactivate={handleDeactivateMental}
                      restore={handleRestoreMental}
                      status={status}
                    />
                  )
                )}
              </ul>
            ) : (
              <EmptyList />
            )
          ) : (
            <Loading size={45} className="h-80" />
          )}
        </Tab>

        <Tab label="Criar Mental" name="createMental">
          <Register<ICreateMental>
            createForm={createForm}
            inputs={createInputs}
            selects={createSelects}
            tab={tab}
            type="Mental"
            defaultImage="/images/defaults/mentals.png"
            handleCreate={handleCreate}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Mentals;
